'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { API_URL, setToken } from '@/lib/auth';

type FormData = {
  nome: string;
  email: string;
  senha: string;
  whatsapp: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  documentoIdentidadeUrl: string;
  jaUsaCannabis: boolean;
  patologiaCID: string;
  documentosMedicosUrls: string[];
  termoAjuizamento: boolean;
  termoConsentimento: boolean;
};

const initialFormData: FormData = {
  nome: '',
  email: '',
  senha: '',
  whatsapp: '',
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  documentoIdentidadeUrl: '',
  jaUsaCannabis: false,
  patologiaCID: '',
  documentosMedicosUrls: [],
  termoAjuizamento: false,
  termoConsentimento: false,
};

const steps = [
  { id: 1, title: 'Dados Pessoais' },
  { id: 2, title: 'Endereço' },
  { id: 3, title: 'Documento' },
  { id: 4, title: 'Informações Médicas' },
  { id: 5, title: 'Termos Legais' },
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
        if (!formData.patologiaCID) {
          setMessage('Informe a patologia com CID');
          return false;
        }
        break;
      case 5:
        if (!formData.termoAjuizamento || !formData.termoConsentimento) {
          setMessage('Você deve aceitar os termos para continuar');
          return false;
        }
        break;
    }
    setMessage('');
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setMessage('');
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/auth/register-associado`, {
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
          patologiaCID: formData.patologiaCID,
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-verde-oliva font-medium mb-1">ABRACANN</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro">
              Cadastro de Associado
            </h1>
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
              <h2 className="text-xl font-semibold text-cinza-escuro mb-4">Dados Pessoais</h2>
              
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
                  <span className={labelClass}>Para qual patologia (com CID)? *</span>
                  <input
                    type="text"
                    value={formData.patologiaCID}
                    onChange={(e) => updateField('patologiaCID', e.target.value)}
                    className={inputClass}
                    placeholder="Ex: Epilepsia (G40)"
                  />
                </label>

                <div className="space-y-2">
                  <span className={labelClass}>Anexar receita médica, laudo/relatório e autorização da Anvisa</span>
                  <p className="text-xs text-cinza-medio">Até 5 arquivos. Máximo 10MB por arquivo.</p>
                  
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

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-cinza-escuro mb-4">Termos Legais</h2>
              
              <div className="space-y-6">
                <div className="bg-cinza-muito-claro rounded-lg p-4 space-y-3">
                  <h3 className="font-medium text-cinza-escuro">Termo de Ajuizamento</h3>
                  <div className="text-sm text-cinza-medio max-h-40 overflow-y-auto">
                    <p>
                      Na qualidade de associado da ABRACANN - Associação Brasileira de Cannabis e Saúde - declaro que autorizo e concordo com ajuizamento da Ação frente a UNIÃO FEDERAL, para reconhecimento do direito ao cultivo de Cannabis sp, para finalidade medicinal, declarando ainda, que o representado é portador de moléstia conforme documentos anexos e que é beneficiado pelo óleo flor ou extrato de Cannabis sp, produzido pela ABRACANN e disponibilizado para seu exclusivo consumo em prol de sua saúde.
                    </p>
                    <p className="mt-2 font-medium">
                      Por ser a expressão da verdade, subscrevemos sob as penas da Lei.
                    </p>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer mt-3">
                    <input
                      type="checkbox"
                      checked={formData.termoAjuizamento}
                      onChange={(e) => updateField('termoAjuizamento', e.target.checked)}
                      className="w-5 h-5 mt-0.5 text-verde-oliva rounded"
                    />
                    <span className="text-sm text-cinza-escuro">
                      Li e concordo com o Termo de Ajuizamento *
                    </span>
                  </label>
                </div>

                <div className="bg-cinza-muito-claro rounded-lg p-4 space-y-3">
                  <h3 className="font-medium text-cinza-escuro">Termo de Consentimento (LGPD)</h3>
                  <div className="text-sm text-cinza-medio">
                    <p>
                      Declaro que as informações prestadas são verdadeiras e autorizo a ABRACANN a utilizá-las exclusivamente para acompanhamento terapêutico e regularização do uso e cultivo medicinal conforme a LGPD.
                    </p>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer mt-3">
                    <input
                      type="checkbox"
                      checked={formData.termoConsentimento}
                      onChange={(e) => updateField('termoConsentimento', e.target.checked)}
                      className="w-5 h-5 mt-0.5 text-verde-oliva rounded"
                    />
                    <span className="text-sm text-cinza-escuro">
                      Li e concordo com o Termo de Consentimento *
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              status === 'error' || (!status || status === 'idle') && message 
                ? 'bg-erro/10 text-erro border border-erro/30' 
                : 'bg-sucesso/10 text-sucesso border border-sucesso/30'
            }`}>
              {message}
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button type="button" variant="secondary" onClick={prevStep}>
                Voltar
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 5 ? (
              <Button type="button" variant="primary" onClick={nextStep}>
                Próximo
              </Button>
            ) : (
              <Button 
                type="button" 
                variant="primary" 
                onClick={handleSubmit}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Enviando...' : 'Finalizar Cadastro'}
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
