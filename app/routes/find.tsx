import { ArrowUp, Paperclip, Trash2 } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import { Button } from 'react-aria-components';
import toast from 'react-hot-toast';
import { GetFileIcon } from '~/components/find/GetFileIcon';
import { formatFileSize, getFileType } from '~/libs/file';

export default function FindPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputFile, setInputFile] = useState<File | null>(null);

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

  function submitMessage() {}

  return (
    <div className="container py-10">
      <div className="w-full rounded-xl border border-gray-200 p-4 px-5 text-sm outline-6 outline-gray-200/50 transition-all has-focus:border-teal-100 has-focus:outline-teal-50">
        <textarea
          name=""
          id=""
          placeholder="Mesele Nedir kardesh?"
          rows={5}
          className="h-full w-full resize-none focus:outline-none"
        ></textarea>
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
            <label className="group block cursor-pointer rounded-full border border-gray-200 p-1.5">
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.webp,.pdf"
                onChange={fileOnChange}
              />
              <Paperclip
                size={16}
                className="stroke-gray-400 transition group-hover:stroke-teal-500"
              />
            </label>
            <Button className="group relative z-20 cursor-pointer rounded-lg bg-teal-600 p-2 outline-4 outline-transparent transition-all hover:outline-teal-100">
              <ArrowUp
                size={16}
                className="stroke-white transition group-hover:rotate-90"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
