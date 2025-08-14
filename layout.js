
export const metadata = { title: 'AI Prompt Store' };

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body style={{fontFamily:'Inter, system-ui, -apple-system, Roboto, Arial', margin:0, background:'#071022', color:'#e6eef6'}}>
        <div style={{maxWidth:960, margin:'2rem auto', padding:'0 1rem'}}>{children}</div>
      </body>
    </html>
  );
}
