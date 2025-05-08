import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-primary text-2xl font-bold">마실</span>
            </Link>
            <p className="text-muted-foreground mt-2 max-w-md text-sm">
              마케터들의 가벼운 마실길, 함께 배우고 성장하는 커뮤니티입니다.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="mb-4 flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} 마실 커뮤니티. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
