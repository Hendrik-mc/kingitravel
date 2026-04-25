'use client';
import * as Dialog from '@radix-ui/react-dialog';

export function FilterDrawer() {
  return <Dialog.Root><Dialog.Trigger className="rounded bg-slate-900 px-4 py-2 text-white md:hidden">Filters</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="fixed inset-0 bg-black/40"/><Dialog.Content className="fixed inset-x-4 top-20 rounded-xl bg-white p-4"><h2 className="font-semibold">Filters</h2><label className="mt-3 block"><input type="checkbox"/> Refundable only</label><Dialog.Close className="mt-4 rounded border px-3 py-2">Apply</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
