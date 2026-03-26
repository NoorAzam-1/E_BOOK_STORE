export default function ToggleTabs() {
  return (
    <div className="flex bg-surface-container-low p-1 rounded-xl">
      <button className="px-4 sm:px-6 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold">
        Reading Now
      </button>
      <button className="px-4 sm:px-6 py-2 text-sm text-on-surface-variant">
        Finished
      </button>
    </div>
  );
}