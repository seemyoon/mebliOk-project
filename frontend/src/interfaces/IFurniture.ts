export interface IFurniture {
  id: string
  name: string
  brand: IBrand
  description: string
  materials: IMaterial[]
  color: IColor[]
  body: string
  price: number
  discount: number
  photos: string[]
  created: string
  updated: string
  weight: string
  in_stock: boolean
  category: ICategory
  subcategory: ISubcategory
  deleted?: string | null
  sellerType: string //todo Enum
}

export interface IBrand {
  id: string
  brand_name: string
}

export interface IMaterial {
  id: string
  material_name: string
}

export interface IColor {
  id: string
  color_name: string
}

export interface ICategory {
  id: string
  title: string
}

export interface ISubcategory {
  id: string
  title: string
}
