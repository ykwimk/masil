'use client';

import { useEffect, useRef, useActionState } from 'react';
import { handleAddToWaitList, type WaitListActionState } from '@/app/actions';
import SubmitButton from './SubmitButton';

export default function WaitListForm() {
  const [state, action] = useActionState<WaitListActionState, FormData>(
    handleAddToWaitList,
    { ok: false, message: '' },
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <div id="waitlist" className="mx-auto mt-6 w-full max-w-xs sm:max-w-xl">
      <form
        ref={formRef}
        action={action}
        className="sm:flex sm:flex-row sm:items-center sm:gap-3"
      >
        <label htmlFor="email" className="sr-only">
          이메일 주소
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="이메일 주소를 입력하세요"
          className="mb-3 h-10 w-full flex-1 rounded-full border border-white/25 bg-white/10 px-5 text-base text-white placeholder:text-white/65 focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none sm:mb-0 sm:h-12 sm:text-sm"
        />
        <div className="w-full sm:w-auto">
          <SubmitButton />
        </div>
      </form>
      <p className="mt-4 ml-0 text-center text-sm break-keep text-white/70 sm:ml-5 sm:text-left">
        사전예약 시, 런칭 소식을 가장 먼저 알려드려요.
      </p>
      {state.message && (
        <div
          role="status"
          className={`mt-3 rounded-lg px-4 py-3 text-sm ${state.ok ? 'bg-green-500/15 text-green-200' : 'bg-red-500/15 text-red-200'}`}
        >
          {state.message}
        </div>
      )}
    </div>
  );
}
