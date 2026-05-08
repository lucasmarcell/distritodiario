import { Layout } from '@/components/layout/Layout';

export default function TermosUso() {
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <article className="prose prose-lg max-w-none">
          <h1 className="headline-lg mb-8">Termos de Uso</h1>
          
          <p className="text-muted-foreground mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>

          <section className="mb-10">
            <h2 className="headline-md mb-4">1. Aceitação dos Termos</h2>
            <p className="body-md text-foreground/80 mb-4">
              Ao acessar e usar o <strong>Distrito Diário</strong>, você concorda em cumprir e estar 
              vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, 
              não deverá usar nosso site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">2. Descrição do Serviço</h2>
            <p className="body-md text-foreground/80 mb-4">
              O Distrito Diário é um veículo de comunicação digital que oferece conteúdo jornalístico 
              sobre notícias, cultura, comportamento e opinião, com foco em Brasília e região.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">3. Propriedade Intelectual</h2>
            <p className="body-md text-foreground/80 mb-4">
              Todo o conteúdo publicado no Distrito Diário, incluindo textos, imagens, gráficos, 
              logotipos e demais materiais, é protegido por direitos autorais e propriedade intelectual. 
              É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.
            </p>
            <p className="body-md text-foreground/80 mb-4">
              Você pode compartilhar nossos artigos em redes sociais, desde que mantenha o crédito 
              e link para a fonte original.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">4. Uso Permitido</h2>
            <p className="body-md text-foreground/80 mb-4">Ao usar nosso site, você concorda em:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Usar o site apenas para fins legais e de acordo com estes termos;</li>
              <li>Não tentar acessar áreas restritas do site sem autorização;</li>
              <li>Não interferir no funcionamento do site ou servidores;</li>
              <li>Não usar o conteúdo para fins comerciais sem autorização.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">5. Comentários e Interações</h2>
            <p className="body-md text-foreground/80 mb-4">
              Caso implementemos áreas de comentários ou interação, você será responsável pelo 
              conteúdo que publicar. Reservamo-nos o direito de remover comentários que considerarmos 
              ofensivos, difamatórios, ilegais ou que violem estes termos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">6. Conteúdo Editorial</h2>
            <p className="body-md text-foreground/80 mb-4">
              O Distrito Diário busca fornecer informações precisas e atualizadas. No entanto, 
              não garantimos a exatidão, completude ou atualidade de todo o conteúdo. As opiniões 
              expressas em colunas e artigos de opinião são de responsabilidade de seus autores.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">7. Links para Sites de Terceiros</h2>
            <p className="body-md text-foreground/80 mb-4">
              Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelo 
              conteúdo, políticas de privacidade ou práticas desses sites. Recomendamos que você 
              leia os termos de uso de cada site que visitar.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">8. Limitação de Responsabilidade</h2>
            <p className="body-md text-foreground/80 mb-4">
              O Distrito Diário não será responsável por quaisquer danos diretos, indiretos, 
              incidentais ou consequentes resultantes do uso ou incapacidade de uso do site, 
              incluindo perda de dados ou lucros.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">9. Alterações nos Termos</h2>
            <p className="body-md text-foreground/80 mb-4">
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
              Alterações entram em vigor imediatamente após a publicação. O uso continuado do 
              site após alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">10. Lei Aplicável</h2>
            <p className="body-md text-foreground/80 mb-4">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. 
              Qualquer disputa será submetida ao foro da comarca de Brasília, Distrito Federal.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="headline-md mb-4">11. Contato</h2>
            <p className="body-md text-foreground/80 mb-4">
              Para dúvidas sobre estes Termos de Uso, entre em contato:
            </p>
            <ul className="list-none space-y-2 text-foreground/80">
              <li><strong>E-mail:</strong> distritodiariocontato@gmail.com</li>
            </ul>
          </section>
        </article>
      </div>
    </Layout>
  );
}