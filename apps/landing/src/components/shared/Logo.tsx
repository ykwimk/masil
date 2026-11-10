import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <h1 className="text-primary font-hakgyoansimMulgyeol text-3xl font-bold">
        마실
      </h1>
    </Link>
  );
};
