import { Chatbot } from '~/components/find/Chatbot';
import { Filter } from '~/components/find/Filter';

export default function FindPage() {
  return (
    <div className="container py-10 pb-40">
      <Chatbot />
      <Filter />
    </div>
  );
}
