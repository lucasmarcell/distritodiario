import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  email: z.string().trim().email({ message: "E-mail inválido" }).max(255, { message: "E-mail muito longo" }),
  subject: z.string().trim().min(3, { message: "Assunto deve ter pelo menos 3 caracteres" }).max(100, { message: "Assunto muito longo" }),
  message: z.string().trim().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }).max(2000, { message: "Mensagem muito longa (máximo 2000 caracteres)" })
});

const Contato = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; subject?: string; message?: string }>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate inputs
    const result = contactSchema.safeParse({ email, subject, message });
    if (!result.success) {
      const fieldErrors: { email?: string; subject?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'subject') fieldErrors.subject = err.message;
        if (err.path[0] === 'message') fieldErrors.message = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with encoded parameters
      const mailtoLink = `mailto:redacaodistritodiario@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`De: ${email}\n\n${message}`)}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      toast({
        title: "E-mail preparado!",
        description: "Seu cliente de e-mail foi aberto. Envie a mensagem para completar o contato.",
      });

      // Clear form
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível preparar o e-mail. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Fale com a Redação
          </h1>
          <p className="text-editorial-gray max-w-md mx-auto">
            Tem uma sugestão de pauta, dúvida ou quer entrar em contato com nossa equipe? 
            Preencha o formulário abaixo e responderemos o mais breve possível.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-editorial-light p-6 md:p-8 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-destructive" : ""}
              required
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Assunto *</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Sobre o que você quer falar?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={errors.subject ? "border-destructive" : ""}
              required
            />
            {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem *</Label>
            <Textarea
              id="message"
              placeholder="Escreva sua mensagem aqui..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`min-h-[150px] resize-none ${errors.message ? "border-destructive" : ""}`}
              required
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            <p className="text-xs text-editorial-gray text-right">{message.length}/2000</p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Preparando..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </>
            )}
          </Button>

          <p className="text-xs text-editorial-gray text-center">
            Ao enviar este formulário, seu cliente de e-mail será aberto com a mensagem preenchida.
          </p>
        </form>

        <div className="mt-8 text-center text-sm text-editorial-gray">
          <p>Ou envie diretamente para:</p>
          <a 
            href="mailto:redacaodistritodiario@gmail.com" 
            className="text-primary hover:underline font-medium"
          >
            redacaodistritodiario@gmail.com
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Contato;
