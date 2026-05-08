import { Layout } from '@/components/layout/Layout';
import { events } from '@/data/mockArticles';
import { Calendar, MapPin, Clock } from 'lucide-react';

const typeLabels: Record<string, string> = {
  show: 'Show',
  cinema: 'Cinema',
  exposicao: 'Exposição',
  teatro: 'Teatro',
  festival: 'Festival',
};

const typeColors: Record<string, string> = {
  show: 'bg-primary/10 text-primary',
  cinema: 'bg-blue-100 text-blue-700',
  exposicao: 'bg-amber-100 text-amber-700',
  teatro: 'bg-purple-100 text-purple-700',
  festival: 'bg-green-100 text-green-700',
};

const Agenda = () => {
  return (
    <Layout>
      <div className="container">
        <header className="py-10 border-b border-editorial-divider">
          <h1 className="headline-xl">Agenda</h1>
          <p className="text-editorial-gray body-lg mt-4 max-w-2xl">
            Agenda cultural da semana. Shows, cinema, exposições e muito mais 
            para você não perder nenhum evento importante.
          </p>
        </header>

        <div className="py-10">
          <div className="space-y-6">
            {events.map((event) => (
              <article 
                key={event.id} 
                className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-editorial-light border-l-4 border-primary"
              >
                <div className="flex-1">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${typeColors[event.type]}`}>
                    {typeLabels[event.type]}
                  </span>
                  <h3 className="font-serif text-xl font-semibold mb-3">
                    {event.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-editorial-gray text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
