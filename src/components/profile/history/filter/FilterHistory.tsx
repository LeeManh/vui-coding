import { FilterActionHistory, FilterTimeHistory, FilterTypeHistory } from ".";

export const FilterHistory = () => {
  return (
    <div className="flex items-center gap-4">
      <FilterTimeHistory />
      <FilterActionHistory />
      <FilterTypeHistory />
    </div>
  );
};
