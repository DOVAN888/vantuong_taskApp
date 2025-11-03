export const FilterType = {
    All: 'all',
    active: 'active',
    completed: "completed"
    
};

export const options = [
  {
    value: "today", // de code trong backend 
    label: "Today",// de hien o fontend 
  },
  {
    value: "week",
    label: "This week",
  },
  {
    value: "month",
    label: "This month",
  },
  {
    value: "all",
    label: "All",
  },
];

// phan phan trag 
export const visibleTaskLimit = 4;


