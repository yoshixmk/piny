import React from "https://esm.sh/react";

export default function Toggle(
  { checked = false, onChange }: { checked?: boolean; onChange: () => void },
) {
  return (
    <div className="toggle-switch">
      <input
        id="toggle"
        className="toggle-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="toggle" className="toggle-label" />
      <span></span>
    </div>
  );
}
