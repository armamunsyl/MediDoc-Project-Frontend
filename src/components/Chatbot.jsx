import React, { useEffect, useRef, useState } from 'react';
import posts from '../data/posts.json';

const recentChats = [
  { id: 'chat-1', title: 'Fever and sore throat', time: '10m ago' },
  { id: 'chat-2', title: 'Blood pressure report review', time: '35m ago' },
  { id: 'chat-3', title: 'Skin allergy concern', time: '1h ago' },
  { id: 'chat-4', title: 'Child cold and cough', time: 'Yesterday' },
];

const starterMessages = [
  {
    id: 'm1',
    role: 'assistant',
    text: 'Hello! Share your symptoms or upload reports. I will provide guidance and suggest the right specialist.',
  },
];

const IMAGE_UPLOAD_RESPONSE = `প্রেসক্রিপশনে যা দেখা যাচ্ছে তা হলো একটি ৪ বছর বয়সী মেয়ের জন্য চিকিৎসা। ক্লিনিক্যাল ডেসক্রিপশনে লেখা আছে URTI অর্থাৎ Upper Respiratory Tract Infection, মানে উপরের শ্বাসনালীর সংক্রমণ (সর্দি, কাশি, গলা ব্যথা ইত্যাদি)।

এখানে যে ওষুধগুলো দেওয়া হয়েছে:

১. Calpol (250/5) syrup – ৪ মি.লি., প্রতি ৬ ঘণ্টা পরপর, ৩ দিন
এটি প্যারাসিটামল।
কাজ: জ্বর কমানো এবং ব্যথা উপশম করা।

২. Delcon syrup – ৩ মি.লি., দিনে ৩ বার, ৫ দিন
কাজ: সর্দি, নাক বন্ধ, কাশি কমাতে সাহায্য করে। সাধারণত এতে অ্যান্টিহিস্টামিন ও ডিকনজেস্ট্যান্ট থাকে।

৩. Levolin syrup – ৩ মি.লি., দিনে ৩ বার, ৫ দিন
কাজ: শ্বাসকষ্ট, বুকের ভেতর সাঁ সাঁ শব্দ বা ব্রঙ্কোস্পাজম কমাতে সাহায্য করে। এটি শ্বাসনালী প্রসারিত করে।

৪. Meftal-P (100/5) syrup – ৩ মি.লি., প্রয়োজন হলে
কাজ: ব্যথা ও জ্বর কমাতে ব্যবহার হয়। সাধারণত প্যারাসিটামল যথেষ্ট হলে এটি দরকার নাও হতে পারে, তবে অতিরিক্ত ব্যথা বা জ্বর হলে দেওয়া হয়।

সারসংক্ষেপে:
এই প্রেসক্রিপশনটি মূলত জ্বর, সর্দি, কাশি এবং শ্বাসনালীর সংক্রমণজনিত সমস্যার জন্য দেওয়া হয়েছে।

যদি এখনও লক্ষণ থাকে বা নতুন করে শ্বাসকষ্ট, উচ্চ জ্বর, খাওয়া কমে যাওয়া বা দুর্বলতা দেখা দেয়, তাহলে অবশ্যই পুনরায় ডাক্তারের পরামর্শ নেওয়া উচিত।`;

const REPORT_IMAGE_RESPONSE = `এটি একটি চেস্ট এক্স–রে (বুকের এক্সরে), যেখানে বাম দিকের কাঁধ ও বুকের অংশ স্পষ্ট দেখা যাচ্ছে।

আমি ছবিটি দেখে সাধারণভাবে যা বোঝা যাচ্ছে তা বলছি, তবে চূড়ান্ত রিপোর্ট সবসময় রেডিওলজিস্ট বা চিকিৎসকই দেবেন।

যা দেখা যাচ্ছে:

১. হাড়ের অংশ
ক্ল্যাভিকল (কলার বোন), কাঁধের জয়েন্ট এবং পাঁজরের হাড়গুলো ভাঙা বা স্থানচ্যুত মনে হচ্ছে না। বড় কোনো স্পষ্ট ফ্র্যাকচার চোখে পড়ছে না।

২. ফুসফুস
বাম পাশের ফুসফুসে নিচের দিকে হালকা সাদা ধরনের ছোপ বা ইনফিলট্রেশন দেখা যাচ্ছে। এটি হতে পারে
• সংক্রমণজনিত পরিবর্তন
• ব্রংকাইটিস
• নিউমোনিয়ার প্রাথমিক লক্ষণ
• অথবা সাধারণ ইনফ্ল্যামেটরি পরিবর্তন

৩. হার্টের সাইজ
এই ছবির অংশে হার্টের সম্পূর্ণ আকার বোঝা যাচ্ছে না, তবে দৃশ্যমান অংশ অস্বাভাবিক বড় মনে হচ্ছে না।

৪. বাইরের ধাতব জিনিস
কাঁধ ও বুকের ওপর গোল আকৃতির ধাতব চিহ্ন দেখা যাচ্ছে। এগুলো সম্ভবত জামার হুক, ক্লিপ বা এক্সরে নেওয়ার সময় শরীরে থাকা ধাতব বস্তু। এগুলো শরীরের ভেতরের কিছু নয়।

গুরুত্বপূর্ণ বিষয়
যদি রোগীর লক্ষণ থাকে যেমন
• জ্বর
• কাশি
• শ্বাসকষ্ট
• বুক ব্যথা

তাহলে ফুসফুসের নিচের দিকের ছোপ সংক্রমণের ইঙ্গিত হতে পারে এবং চিকিৎসকের সরাসরি পরামর্শ প্রয়োজন।

এক্সরে দেখে একা নিশ্চিত রোগ নির্ণয় করা যায় না। রোগীর উপসর্গ, রক্ত পরীক্ষা এবং ডাক্তারের শারীরিক পরীক্ষা মিলিয়ে সিদ্ধান্ত নিতে হয়।`;

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const normalizeText = (value) =>
  value
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const keywordAliasMap = {
  'জ্বর': 'jor',
  'জর': 'jor',
  fever: 'jor',
  'বুকে ব্যথা': 'buke betha',
  chestpain: 'buke betha',
  'গর্ভাবস্থা': 'pregnancy',
  pregnant: 'pregnancy',
  'ডায়াবেটিস': 'diabetes',
  diabetes: 'diabetes',
  stroke: 'stroke',
  uti: 'uti',
  allergy: 'allergy',
};

const findRelevantPost = (userInput) => {
  const normalizedInput = normalizeText(userInput);
  if (!normalizedInput) return null;

  const expandedInputs = [normalizedInput];
  Object.entries(keywordAliasMap).forEach(([source, target]) => {
    if (normalizedInput.includes(source)) {
      expandedInputs.push(normalizeText(target));
    }
  });

  const foundPost = posts.find((post) => {
    const postKeyword = normalizeText(post.keyword || '');
    const keywordTokens = postKeyword.split(' ').filter(Boolean);

    return expandedInputs.some((input) => {
      if (input.includes(postKeyword)) return true;
      return keywordTokens.length > 0 && keywordTokens.every((token) => input.includes(token));
    });
  });

  return foundPost || null;
};

const Chatbot = () => {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('');
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      setPreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const sendMessage = async () => {
    const text = input.trim();
    if ((!text && !selectedFile) || isAnalyzing) return;

    const isImage = selectedFile?.type?.startsWith('image/');
    let imagePreview = '';
    if (selectedFile && isImage) {
      imagePreview = await fileToDataUrl(selectedFile);
    }

    let userText = text;
    if (!text && selectedFile && !isImage) {
      userText = `Attached file: ${selectedFile.name}`;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: userText,
      imagePreview,
      fileName: selectedFile?.name || '',
      fileType: selectedFile?.type || '',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSelectedFile(null);
    setIsAnalyzing(true);

    setTimeout(() => {
      if (selectedFile && isImage) {
        const hasReportKeyword =
          normalizeText(text).includes('report') || normalizeText(text).includes('রিপোর্ট');

        const imageBotMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: hasReportKeyword ? REPORT_IMAGE_RESPONSE : IMAGE_UPLOAD_RESPONSE,
          referencedPost: null,
        };
        setMessages((prev) => [...prev, imageBotMessage]);
        setIsAnalyzing(false);
        return;
      }

      const matchedPost = findRelevantPost(text);
      const referenceText = matchedPost
        ? `\n\nরেফারেন্স পোস্ট: ${matchedPost.authorName} • ${matchedPost.designation}\n"${matchedPost.mainPostBody}"`
        : '';
      const answerText = matchedPost?.Ans
        ? matchedPost.Ans
        : 'বিশ্লেষণ সম্পন্ন হয়েছে। আপনার উপসর্গ অনুযায়ী আপাতত বিশ্রাম নিন, পর্যাপ্ত পানি পান করুন এবং প্রয়োজন হলে বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন। উপসর্গ বাড়লে দ্রুত হাসপাতালে যোগাযোগ করুন।';

      const botMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: `${answerText}${referenceText}`,
        referencedPost: matchedPost
          ? {
              keyword: matchedPost.keyword,
              authorName: matchedPost.authorName,
              designation: matchedPost.designation,
              category: matchedPost.category,
              mainPostBody: matchedPost.mainPostBody,
            }
          : null,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsAnalyzing(false);
    }, 15000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    event.target.value = '';
  };

  return (
    <section className="mx-auto w-[96%] max-w-7xl py-6">
      <div className="grid min-h-[70vh] gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">Recent Chats</h2>
          <div className="mt-4 space-y-2">
            {recentChats.map((chat, index) => (
              <button
                key={chat.id}
                type="button"
                className={`w-full rounded-lg p-3 text-left transition ${
                  index === 0
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <p className="text-sm font-semibold">{chat.title}</p>
                <p className={`mt-1 text-xs ${index === 0 ? 'text-white/90' : 'text-slate-500'}`}>
                  {chat.time}
                </p>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-200 px-5 py-4">
            <h1 className="text-lg font-bold text-slate-900">MediDoc Chatbot</h1>
            <p className="text-sm text-slate-500">Ask health questions or upload reports.</p>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'user' && message.imagePreview && (
                  <div className="ml-auto mb-2 w-fit max-w-[70%] overflow-hidden rounded-xl">
                    <img
                      src={message.imagePreview}
                      alt="Uploaded preview"
                      className="h-28 w-28 object-cover sm:h-32 sm:w-32"
                    />
                  </div>
                )}

                {message.role === 'user' && !message.imagePreview && message.fileName && message.fileType && !message.fileType.startsWith('image/') && (
                  <div className="ml-auto mb-2 w-fit max-w-[70%] rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                    Attached: {message.fileName}
                  </div>
                )}

                {message.text && (
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'ml-auto w-fit max-w-[55%] bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {message.role === 'assistant' && message.referencedPost && (
                  <div className="mt-2 max-w-[80%] rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-emerald-700">
                      Related Post Reference
                    </p>
                    <p className="mt-1 font-semibold">
                      {message.referencedPost.authorName} • {message.referencedPost.designation}
                    </p>
                    <p className="text-xs text-emerald-700">
                      Category: {message.referencedPost.category}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {isAnalyzing && (
              <div className="max-w-[80%] rounded-xl bg-slate-100 px-4 py-2.5 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span>বিশ্লেষণ করা হচ্ছে</span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-4">
            {selectedFile && previewUrl && (
              <div className="mb-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={previewUrl}
                    alt="Selected upload preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs font-bold text-white"
                    aria-label="Remove selected file"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {selectedFile && !previewUrl && (
              <div className="mb-3 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                <span className="truncate">Attached: {selectedFile.name}</span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="ml-3 rounded px-2 py-0.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500 text-2xl leading-none text-emerald-600 transition hover:bg-emerald-50"
                aria-label="Upload file"
              >
                +
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
              />

              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendMessage();
                }}
                placeholder="Type your message with optional report..."
                className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-emerald-500 focus:ring-2"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={isAnalyzing}
                className="h-10 rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
