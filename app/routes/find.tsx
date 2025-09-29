import { Chatbot } from '~/components/find/Chatbot';
import { Doctors } from '~/components/find/Doctors';
import { Filter } from '~/components/find/Filter';

export default function FindPage() {
  return (
    <div className="container py-10 pb-40">
      <Chatbot />
      <Filter />
      <Doctors />
    </div>
  );
}
