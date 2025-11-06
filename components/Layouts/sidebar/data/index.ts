import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Sản phầm",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Quản lý sản phẩm",
            url: "/admin/products",
          },
          {
            title: "Quản lý danh mục",
            url: "/admin/category",
          },
          {
            title: "Quản lý size sản phẩm",
            url: "/admin/product-sizes",
          },
          {
            title: "Quản lý màu sắc",
            url: "/admin/product-colors",
          },
        ],
      },
      {
        title: "Bộ sưu tập",
        url: "/admin/collections",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Khuyến mãi",
        url: "/admin/discounts",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Media",
        url: "/admin/media",
        icon: Icons.Table,
        items: [],
      },
      // {
      //   title: "Forms",
      //   icon: Icons.Alphabet,
      //   items: [
      //     {
      //       title: "Form Elements",
      //       url: "/forms/form-elements",
      //     },
      //     {
      //       title: "Form Layout",
      //       url: "/forms/form-layout",
      //     },
      //   ],
      // },
      // {
      //   title: "Tables",
      //   url: "/tables",
      //   icon: Icons.Table,
      //   items: [
      //     {
      //       title: "Tables",
      //       url: "/tables",
      //     },
      //   ],
      // },
    ],
  }
];
