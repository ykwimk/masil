import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="cursor-pointer rounded-full px-6 sm:px-8"
      disabled={pending}
    >
      {pending ? '등록 중…' : '사전예약 신청'}
    </Button>
  );
}
