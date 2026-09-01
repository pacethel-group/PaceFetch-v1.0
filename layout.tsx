import './globals.css'

export const metadata = {
  title: 'PaceFetch - Free Private PDF Tools | Merge, Compress, JPG to PDF 100kb',
  description: 'Merge, split, compress, convert PDF to Word, JPG to PDF 100kb - 100% private, offline, free. Your files never leave your device.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
