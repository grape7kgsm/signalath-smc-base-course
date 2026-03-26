import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">ページが見つかりません</h1>
      <p className="text-gray-500 mb-8">
        お探しのページは存在しないか、削除された可能性があります。
      </p>
      <Link
        href="/contents"
        className="text-sm text-gray-600 hover:text-gray-900 underline"
      >
        講座一覧に戻る
      </Link>
    </main>
  );
}
