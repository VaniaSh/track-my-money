export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

export interface CategoryFilterProps {
  categories: CategoryItem[];
  selectedCategories: string[];
  onCategorySelect?: (categoryId: string) => void;
  onCategoryDeselect?: (categoryId: string) => void;
  style?: any;
  showAllOption?: boolean;
}
