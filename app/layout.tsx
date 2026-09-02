import './globals.css'

export const metadata = {
  title: 'PaceFetch - Free Private PDF Tools',
  description: 'Free private PDF tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
