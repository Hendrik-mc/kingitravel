export function StickyMobileBookBar({ price }: { price: number }) {
  return <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-3 md:hidden"><button className="w-full rounded bg-brand-500 px-4 py-3 text-white">Book from ${price}</button></div>;
}
