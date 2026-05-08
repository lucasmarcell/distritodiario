import { Layout } from '@/components/layout/Layout';

export default function PoliticaPrivacidade() {
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <article className="prose prose-lg max-w-none">
          <h1 className="headline-lg mb-8">Política de Privacidade</h1>
          
          <p className="text-muted-foreground mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>

          <section className="mb-10">
            <h2 className="headline-md mb-4">1. Introdução</h2>
            <p className="body-md text-foreground/80 mb-4">
              O <strong>Distrito Diário</strong> ("nós", "nosso" ou "site") valoriza a privacidade dos seus visitantes 
              e leitores. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos 
              suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">2. Dados que Coletamos</h2>
            <p className="body-md text-foreground/80 mb-4">Podemos coletar os seguintes tipos de dados:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e origem do acesso.</li>
              <li><strong>Cookies:</strong> pequenos arquivos armazenados no seu dispositivo para melhorar a experiência de navegação.</li>
              <li><strong>Dados fornecidos voluntariamente:</strong> nome e e-mail, caso você se cadastre em nossa newsletter ou entre em contato conosco.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">3. Finalidade do Tratamento de Dados</h2>
            <p className="body-md text-foreground/80 mb-4">Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Fornecer e melhorar nossos serviços de conteúdo jornalístico;</li>
              <li>Analisar métricas de acesso e comportamento dos usuários para aprimorar a experiência;</li>
              <li>Enviar comunicações, caso você tenha optado por recebê-las;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">4. Cookies e Tecnologias Similares</h2>
            <p className="body-md text-foreground/80 mb-4">
              Utilizamos cookies para personalizar conteúdo, analisar tráfego e melhorar a navegação. 
              Os tipos de cookies que usamos incluem:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site.</li>
              <li><strong>Cookies de análise:</strong> coletam informações sobre como os visitantes usam o site.</li>
              <li><strong>Cookies de preferência:</strong> lembram suas escolhas e configurações.</li>
            </ul>
            <p className="body-md text-foreground/80 mt-4">
              Você pode gerenciar ou desativar cookies nas configurações do seu navegador, mas isso pode 
              afetar algumas funcionalidades do site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">5. Compartilhamento de Dados</h2>
            <p className="body-md text-foreground/80 mb-4">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins 
              comerciais. Podemos compartilhar dados apenas nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Com prestadores de serviços que nos auxiliam na operação do site (hospedagem, análise de dados);</li>
              <li>Quando exigido por lei ou ordem judicial;</li>
              <li>Para proteger nossos direitos legais.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">6. Seus Direitos (LGPD)</h2>
            <p className="body-md text-foreground/80 mb-4">
              Conforme a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados e acessá-los;</li>
              <li><strong>Correção:</strong> solicitar a correção de dados incompletos ou incorretos;</li>
              <li><strong>Anonimização ou exclusão:</strong> solicitar a anonimização ou exclusão de dados desnecessários;</li>
              <li><strong>Portabilidade:</strong> solicitar a transferência de seus dados para outro serviço;</li>
              <li><strong>Revogação do consentimento:</strong> revogar seu consentimento a qualquer momento;</li>
              <li><strong>Oposição:</strong> opor-se ao tratamento de dados em certas circunstâncias.</li>
            </ul>
            <p className="body-md text-foreground/80 mt-4">
              Para exercer seus direitos, entre em contato conosco pelo e-mail: <strong>distritodiariocontato@gmail.com</strong>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">7. Segurança dos Dados</h2>
            <p className="body-md text-foreground/80 mb-4">
              Adotamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais 
              contra acesso não autorizado, perda, destruição ou alteração. No entanto, nenhum sistema 
              de transmissão ou armazenamento é 100% seguro.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">8. Retenção de Dados</h2>
            <p className="body-md text-foreground/80 mb-4">
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
              descritas nesta política, ou conforme exigido por lei.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">9. Alterações nesta Política</h2>
            <p className="body-md text-foreground/80 mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você 
              revise esta página regularmente para estar ciente de quaisquer mudanças. A data da 
              última atualização está indicada no topo deste documento.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">10. Contato</h2>
            <p className="body-md text-foreground/80 mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus 
              dados, entre em contato conosco:
            </p>
            <ul className="list-none space-y-2 text-foreground/80">
              <li><strong>E-mail:</strong> distritodiariocontato@gmail.com</li>
              <li><strong>Site:</strong> Distrito Diário</li>
            </ul>
          </section>
        </article>
      </div>
    </Layout>
  );
}