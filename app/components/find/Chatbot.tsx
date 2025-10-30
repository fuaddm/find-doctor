import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowUp, Paperclip, Trash2 } from 'lucide-react';
import { useContext, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Button } from 'react-aria-components';
import { useFetcher } from 'react-router';
import { toast } from 'sonner';
import { GetFileIcon } from '~/components/find/GetFileIcon';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { cn } from '~/libs/cn';
import { formatFileSize, getFileType } from '~/libs/file';
import aiLottie from '~/assets/lottie-animations/ai.lottie?url';
import { DoctorsContext } from '~/components/find/DoctorsContext';

export function Chatbot() {
  const { data, loading: isLoading } = useContext(DoctorsContext);
  const fetcher = useFetcher({ key: 'msg-to-ai' });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [textareaValue, setTextareaValue] = useState('');

  function fileOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      // Less than 5mb
      if (e.target.files?.[0].size < 5242880) {
        setInputFile(e.target.files?.[0]);
      } else {
        setInputFile(null);
        toast.error('File size should be less than 5mb');
      }
    } else {
      setInputFile(null);
    }
  }

  const clearFile = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setInputFile(null);
  };

  function ChatOnKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      fetcher.submit(
        { text: textareaValue, type: 'msg-to-ai' },
        {
          method: 'post',
        }
      );
    }
  }

  return (
    <div className="mb-8 grid">
      <fetcher.Form
        method="POST"
        className={cn({
          'w-full rounded-xl border border-gray-200 p-4 px-5 text-sm outline-6 outline-gray-200/50 transition-all has-focus:border-teal-100 has-focus:outline-teal-50': true,
          'borderPulse bg-gray-50': isLoading,
        })}
      >
        <textarea
          name="text"
          id=""
          placeholder="Narahatlığınızı və ya simptomlarınızı qeyd edin"
          disabled={isLoading}
          onKeyDown={ChatOnKeyDown}
          className={cn({
            'field-sizing-content h-fit max-h-[200px] min-h-[100px] w-full resize-none focus:outline-none': true,
            'text-gray-500': isLoading,
          })}
          onChange={(e) => setTextareaValue(e.target.value)}
        ></textarea>
        <input
          type="hidden"
          name="type"
          value="msg-to-ai"
        />
        <div>
          {inputFile && (
            <div className="mb-2">
              <div className="flex w-fit rounded-xl border border-gray-200 p-4">
                {<GetFileIcon fileType={getFileType(inputFile.name)} />}
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600">{inputFile.name}</div>
                      <div className="text-xs text-gray-600">{formatFileSize(inputFile.size)}</div>
                    </div>
                    <div className="relative h-8 w-8">
                      <Button
                        type="button"
                        onPress={clearFile}
                        className="absolute -top-1.5 -right-1.5 h-fit rounded-md p-2 transition hover:bg-gray-50"
                      >
                        <Trash2
                          size={16}
                          className="stroke-gray-400"
                        />
                      </Button>
                    </div>
                  </div>
                  {/* <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="absolute h-full w-full -translate-x-1/2 rounded-full bg-teal-600"></div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="group block rounded-full border border-gray-200 p-1.5 has-[input:focus]:cursor-pointer">
                  <input
                    ref={inputRef}
                    type="file"
                    disabled={isLoading || true}
                    className="hidden"
                    accept=".png,.jpg,.jpeg,.webp,.pdf"
                    onChange={fileOnChange}
                  />
                  <Paperclip
                    size={16}
                    className="stroke-gray-400 transition group-has-[input:focus]:stroke-teal-500"
                  />
                </label>
              </TooltipTrigger>
              <TooltipContent>
                <p className="relative z-10">Tezliklə</p>
              </TooltipContent>
            </Tooltip>
            <Button
              type="submit"
              isDisabled={isLoading}
              className="group relative z-20 rounded-lg bg-teal-600 p-2 outline-4 outline-transparent transition-all not-disabled:cursor-pointer not-disabled:hover:outline-teal-100"
            >
              <ArrowUp
                size={16}
                className={cn({
                  'stroke-white transition group-hover:rotate-90': true,
                  'rotate-90': isLoading,
                })}
              />
            </Button>
          </div>
        </div>
      </fetcher.Form>
      <div
        className={cn({
          'invisible flex h-0 scale-70 gap-1 opacity-0 transition-[visibility,transform,opacity] duration-500': true,
          'visible mt-6 h-auto scale-100 opacity-100': fetcher.data?.aiTextResponse && !isLoading,
        })}
      >
        <div className="h-16 max-h-16 min-h-16 w-16 max-w-16 min-w-16 -translate-y-3 rounded-full">
          <DotLottieReact
            src={aiLottie}
            loop
            autoplay
            style={{
              width: '64px',
              height: '64px',
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="rounded-lg bg-teal-600 p-4 text-white">
          <span className="font-medium">{fetcher.data?.aiTextResponse?.ixtisas} - </span>
          {fetcher.data?.aiTextResponse?.izah}
        </div>
      </div>
    </div>
  );
}
