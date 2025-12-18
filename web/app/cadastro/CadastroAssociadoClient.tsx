'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { setToken } from '@/lib/auth';

const PATOLOGIAS_COMUNS = [
  { label: 'Epilepsia', cid: 'G40' },
  { label: 'Dor crônica', cid: 'R52.1' },
  { label: 'Transtorno de Ansiedade', cid: 'F41' },
  { label: 'Fibromialgia', cid: 'M79.7' },
  { label: 'Esclerose Múltipla', cid: 'G35' },
  { label: 'Doença de Parkinson', cid: 'G20' },
  { label: 'Transtorno do Espectro Autista', cid: 'F84.0' },
  { label: 'TDAH', cid: 'F90' },
  { label: 'Insônia', cid: 'G47.0' },
  { label: 'Artrite Reumatoide', cid: 'M06.9' },
  { label: 'Dor Oncológica', cid: 'C80' },
  { label: 'Depressão', cid: 'F32' },
  { label: 'Transtorno de Estresse Pós-Traumático', cid: 'F43.1' },
  { label: 'Síndrome de Tourette', cid: 'F95.2' },
  { label: 'Alzheimer', cid: 'G30' },
  { label: 'Outra (especificar)', cid: '' },
];

type FormData = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  whatsapp: string;
  termoAjuizamento: boolean;
  termoConsentimento: boolean;
  termoPoliticaPrivacidade: boolean;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  documentoIdentidadeUrl: string;
  jaUsaCannabis: boolean;
  patologiaSelecionada: string;
  patologiaPersonalizada: string;
  documentosMedicosUrls: string[];
};

const initialFormData: FormData = {
  nome: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  whatsapp: '',
  termoAjuizamento: false,
  termoConsentimento: false,
  termoPoliticaPrivacidade: false,
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  documentoIdentidadeUrl: '',
  jaUsaCannabis: false,
  patologiaSelecionada: '',
  patologiaPersonalizada: '',
  documentosMedicosUrls: [],
};

const steps = [
  { id: 1, title: 'Dados e Termos' },
  { id: 2, title: 'Endereço' },
  { id: 3, title: 'Documento' },
  { id: 4, title: 'Informações Médicas' },
];

export default function CadastroAssociadoClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadingMedicos, setUploadingMedicos] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const router = useRouter();

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const buscarCEP = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;
    
    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setCepLoading(false);
    }
  };

  const preventPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setMessage('Por segurança, digite a senha novamente sem copiar e colar.');
  };

  const handleDocumentoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setMessage('Arquivo muito grande. Máximo 10MB.');
      return;
    }

    setUploadingDoc(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch('/api/upload/documento-identidade', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await response.json();
      if (data.success) {
        updateField('documentoIdentidadeUrl', data.data.url);
        setMessage('');
      } else {
        setMessage(data.message || 'Erro ao enviar documento');
      }
    } catch (error) {
      setMessage('Erro ao enviar documento');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleDocumentosMedicosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 5) {
      setMessage('Máximo de 5 arquivos permitidos.');
      return;
    }

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        setMessage('Um ou mais arquivos excedem 10MB.');
        return;
      }
    }

    setUploadingMedicos(true);
    const formDataUpload = new FormData();
    Array.from(files).forEach(file => formDataUpload.append('files', file));

    try {
      const response = await fetch('/api/upload/documentos-medicos', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await response.json();
      if (data.success) {
        updateField('documentosMedicosUrls', data.data.urls);
        setMessage('');
      } else {
        setMessage(data.message || 'Erro ao enviar documentos médicos');
      }
    } catch (error) {
      setMessage('Erro ao enviar documentos médicos');
    } finally {
      setUploadingMedicos(false);
    }
  };

  const getPatologiaCID = (): string => {
    if (formData.patologiaSelecionada === 'Outra (especificar)') {
      return formData.patologiaPersonalizada;
    }
    const patologia = PATOLOGIAS_COMUNS.find(p => p.label === formData.patologiaSelecionada);
    return patologia ? `${patologia.label} (${patologia.cid})` : '';
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.nome || !formData.email || !formData.senha || !formData.whatsapp) {
          setMessage('Preencha todos os campos obrigatórios');
          return false;
        }
        if (formData.senha.length < 8) {
          setMessage('A senha deve ter pelo menos 8 caracteres');
          return false;
        }
        if (formData.senha !== formData.confirmarSenha) {
          setMessage('As senhas não coincidem');
          return false;
        }
        if (!formData.termoAjuizamento || !formData.termoConsentimento || !formData.termoPoliticaPrivacidade) {
          setMessage('Você deve aceitar todos os termos para continuar');
          return false;
        }
        break;
      case 2:
        if (!formData.cep || !formData.rua || !formData.numero || !formData.cidade || !formData.estado) {
          setMessage('Preencha o endereço completo');
          return false;
        }
        break;
      case 3:
        if (!formData.documentoIdentidadeUrl) {
          setMessage('Anexe um documento com foto');
          return false;
        }
        break;
      case 4:
        if (!formData.patologiaSelecionada) {
          setMessage('Selecione uma patologia');
          return false;
        }
        if (formData.patologiaSelecionada === 'Outra (especificar)' && !formData.patologiaPersonalizada) {
          setMessage('Informe a patologia com CID');
          return false;
        }
        break;
    }
    setMessage('');
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setMessage('');
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/auth/register-associado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.senha,
          role: 'PACIENTE',
          nome: formData.nome,
          whatsapp: formData.whatsapp.replace(/\D/g, ''),
          cep: formData.cep.replace(/\D/g, ''),
          rua: formData.rua,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          documentoIdentidadeUrl: formData.documentoIdentidadeUrl,
          jaUsaCannabis: formData.jaUsaCannabis,
          patologiaCID: getPatologiaCID(),
          documentosMedicosUrls: formData.documentosMedicosUrls,
          termoAjuizamento: formData.termoAjuizamento,
          consenteLGPD: formData.termoConsentimento,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao cadastrar');
      }

      const data = await response.json();
      if (data.accessToken) {
        setToken(data.accessToken);
        setStatus('success');
        setMessage('Cadastro realizado com sucesso! Redirecionando...');
        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Erro ao cadastrar');
    }
  };

  const inputClass = "w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva";
  const labelClass = "text-sm font-medium text-cinza-escuro";
  const checkboxLabelClass = "flex items-start gap-3 cursor-pointer text-sm text-cinza-escuro";

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-verde-oliva font-medium mb-1">ABRACANM</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro">
              Cadastro de Associado
            </h1>
            <p className="text-sm text-cinza-medio mt-1">
              Seu primeiro passo para uma vida com mais saúde e qualidade
            </p>
          </div>
          <Link href="/" className="text-sm text-verde-oliva hover:underline">
            Voltar
          </Link>
        </div>

        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div key={step.id} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.id 
                  ? 'bg-verde-oliva text-white' 
                  : 'bg-cinza-claro text-cinza-medio'
              }`}>
                {step.id}
              </div>
              <span className={`text-xs mt-1 hidden sm:block ${
                currentStep >= step.id ? 'text-verde-oliva' : 'text-cinza-medio'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-cinza-claro rounded-2xl shadow-sm p-6 sm:p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-cinza-escuro mb-4">Dados Pessoais e Termos</h2>
              
              <div className="space-y-4">
                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Nome completo *</span>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => updateField('nome', e.target.value)}
                    className={inputClass}
                    placeholder="Seu nome completo"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>WhatsApp *</span>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', formatWhatsApp(e.target.value))}
                    className={inputClass}
                    placeholder="(00) 00000-0000"
                    maxLength={16}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>E-mail *</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={inputClass}
                    placeholder="seu@email.com"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Senha *</span>
                  <input
                    type="password"
                    value={formData.senha}
                    onChange={(e) => updateField('senha', e.target.value)}
                    className={inputClass}
                    placeholder="Mínimo 8 caracteres"
                    minLength={8}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Confirmar Senha *</span>
                  <input
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={(e) => updateField('confirmarSenha', e.target.value)}
                    onPaste={preventPaste}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    className={inputClass}
                    placeholder="Digite a senha novamente"
                    minLength={8}
                  />
                </label>

                <div className="border-t border-cinza-claro pt-4 mt-6">
                  <h3 className="text-lg font-medium text-cinza-escuro mb-4">Termos e Consentimentos</h3>
                  
                  <div className="space-y-4">
                    <label className={checkboxLabelClass}>
                      <input
                        type="checkbox"
                        checked={formData.termoAjuizamento}
                        onChange={(e) => updateField('termoAjuizamento', e.target.checked)}
                        className="w-5 h-5 mt-0.5 text-verde-oliva rounded border-cinza-claro focus:ring-verde-oliva"
                      />
                      <span>
                        Li e aceito o <a href="/termos-uso" target="_blank" className="text-verde-oliva underline">Termo de Uso</a> da ABRACANM, 
                        incluindo as condições para ajuizamento de ações coletivas em meu benefício.
                      </span>
                    </label>

                    <label className={checkboxLabelClass}>
                      <input
                        type="checkbox"
                        checked={formData.termoConsentimento}
                        onChange={(e) => updateField('termoConsentimento', e.target.checked)}
                        className="w-5 h-5 mt-0.5 text-verde-oliva rounded border-cinza-claro focus:ring-verde-oliva"
                      />
                      <span>
                        Consinto com o tratamento dos meus dados pessoais e de saúde conforme a 
                        <a href="/lgpd" target="_blank" className="text-verde-oliva underline ml-1">Lei Geral de Proteção de Dados (LGPD)</a>.
                      </span>
                    </label>

                    <label className={checkboxLabelClass}>
                      <input
                        type="checkbox"
                        checked={formData.termoPoliticaPrivacidade}
                        onChange={(e) => updateField('termoPoliticaPrivacidade', e.target.checked)}
                        className="w-5 h-5 mt-0.5 text-verde-oliva rounded border-cinza-claro focus:ring-verde-oliva"
                      />
                      <span>
                        Li e aceito a <a href="/politica-privacidade" target="_blank" className="text-verde-oliva underline">Política de Privacidade</a> da ABRACANM.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-cinza-escuro mb-4">Endereço</h2>
              
              <div className="space-y-4">
                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>CEP *</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.cep}
                      onChange={(e) => {
                        const formatted = formatCEP(e.target.value);
                        updateField('cep', formatted);
                        if (formatted.replace(/\D/g, '').length === 8) {
                          buscarCEP(formatted);
                        }
                      }}
                      className={inputClass}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                    {cepLoading && <span className="text-sm text-cinza-medio self-center">Buscando...</span>}
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Rua *</span>
                  <input
                    type="text"
                    value={formData.rua}
                    onChange={(e) => updateField('rua', e.target.value)}
                    className={inputClass}
                    placeholder="Nome da rua"
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Número *</span>
                    <input
                      type="text"
                      value={formData.numero}
                      onChange={(e) => updateField('numero', e.target.value)}
                      className={inputClass}
                      placeholder="123"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Complemento</span>
                    <input
                      type="text"
                      value={formData.complemento}
                      onChange={(e) => updateField('complemento', e.target.value)}
                      className={inputClass}
                      placeholder="Apto, sala..."
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Bairro *</span>
                  <input
                    type="text"
                    value={formData.bairro}
                    onChange={(e) => updateField('bairro', e.target.value)}
                    className={inputClass}
                    placeholder="Bairro"
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Cidade *</span>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => updateField('cidade', e.target.value)}
                      className={inputClass}
                      placeholder="Cidade"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Estado *</span>
                    <input
                      type="text"
                      value={formData.estado}
                      onChange={(e) => updateField('estado', e.target.value)}
                      className={inputClass}
                      placeholder="UF"
                      maxLength={2}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-cinza-escuro mb-4">Documento com Foto</h2>
              
              <p className="text-sm text-cinza-medio mb-4">
                Anexe um documento de identificação com foto (RG, CNH, Passaporte).
              </p>

              <div className="border-2 border-dashed border-cinza-claro rounded-lg p-6 text-center">
                {formData.documentoIdentidadeUrl ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sucesso">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">Documento enviado com sucesso!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateField('documentoIdentidadeUrl', '')}
                      className="text-sm text-erro hover:underline"
                    >
                      Remover e enviar outro
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="space-y-2">
                      <svg className="w-12 h-12 mx-auto text-cinza-medio" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-cinza-medio">
                        {uploadingDoc ? 'Enviando...' : 'Clique para selecionar ou arraste o arquivo'}
                      </p>
                      <p className="text-xs text-cinza-medio">JPG, PNG ou PDF. Máximo 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleDocumentoUpload}
                      className="hidden"
                      disabled={uploadingDoc}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-cinza-escuro mb-4">Informações Médicas</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className={labelClass}>Já é paciente de cannabis medicinal com receita médica?</span>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="jaUsaCannabis"
                        checked={formData.jaUsaCannabis}
                        onChange={() => updateField('jaUsaCannabis', true)}
                        className="w-4 h-4 text-verde-oliva"
                      />
                      <span>Sim</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="jaUsaCannabis"
                        checked={!formData.jaUsaCannabis}
                        onChange={() => updateField('jaUsaCannabis', false)}
                        className="w-4 h-4 text-verde-oliva"
                      />
                      <span>Não</span>
                    </label>
                  </div>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Qual sua condição de saúde? *</span>
                  <select
                    value={formData.patologiaSelecionada}
                    onChange={(e) => updateField('patologiaSelecionada', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Selecione uma condição</option>
                    {PATOLOGIAS_COMUNS.map((patologia) => (
                      <option key={patologia.label} value={patologia.label}>
                        {patologia.cid ? `${patologia.label} (${patologia.cid})` : patologia.label}
                      </option>
                    ))}
                  </select>
                </label>

                {formData.patologiaSelecionada === 'Outra (especificar)' && (
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Informe sua condição com CID *</span>
                    <input
                      type="text"
                      value={formData.patologiaPersonalizada}
                      onChange={(e) => updateField('patologiaPersonalizada', e.target.value)}
                      className={inputClass}
                      placeholder="Ex: Neuropatia (G62.9)"
                    />
                  </label>
                )}

                <div className="space-y-2">
                  <span className={labelClass}>Anexar documentos médicos (opcional)</span>
                  <p className="text-xs text-cinza-medio">Receita médica, laudo, autorização da Anvisa. Até 5 arquivos, máximo 10MB cada.</p>
                  
                  <div className="border-2 border-dashed border-cinza-claro rounded-lg p-6 text-center">
                    {formData.documentosMedicosUrls.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2 text-sucesso">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-medium">{formData.documentosMedicosUrls.length} documento(s) enviado(s)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateField('documentosMedicosUrls', [])}
                          className="text-sm text-erro hover:underline"
                        >
                          Remover e enviar outros
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="space-y-2">
                          <svg className="w-12 h-12 mx-auto text-cinza-medio" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-cinza-medio">
                            {uploadingMedicos ? 'Enviando...' : 'Clique para selecionar os arquivos'}
                          </p>
                          <p className="text-xs text-cinza-medio">JPG, PNG ou PDF</p>
                        </div>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          multiple
                          onChange={handleDocumentosMedicosUpload}
                          className="hidden"
                          disabled={uploadingMedicos}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              status === 'success' ? 'bg-sucesso/10 text-sucesso' :
              status === 'error' ? 'bg-erro/10 text-erro' :
              'bg-alerta/10 text-alerta'
            }`}>
              {message}
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button variant="secondary" onClick={prevStep}>
                Voltar
              </Button>
            ) : (
              <div />
            )}
            
            {currentStep < 4 ? (
              <Button variant="primary" onClick={nextStep}>
                Continuar
              </Button>
            ) : (
              <Button 
                variant="primary" 
                onClick={handleSubmit}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Cadastrando...' : 'Finalizar Cadastro'}
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-cinza-medio mt-6">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-verde-oliva hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}
