import LogoutButton from "@/components/logout-btn";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
          <div className="flex flex-row-reverse px-4 py-2">
            <LogoutButton />
          </div>
          {children}
      </body>
    </html>
  );
}
