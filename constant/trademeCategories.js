export const CATEGORY = {};

export const PAYMENT_METHOD = [
  "NZ bank deposit",
  "Credit Card",
  "Cash",
  "Safe Trader (Now obsolete)",
  "Other",
  "Ping",
  "Afterpay",
];

export const VALIDATE_PAYMENT_METHOD = (id) => {
  switch (id) {
    case 0:
      return "No payment methods provided";
      break;
    case 1:
      return "NZ bank deposit";
      break;
    case 2:
      return "Credit Card";
      break;
    case 4:
      return "Cash";
      break;
    case 8:
      return "Safe Trader (Now obsolete)";
      break;
    case 16:
      return "Other";
      break;
    case 32:
      return "Ping";
      break;
    case 64:
      return "Afterpay";
      break;
    case "No payment methods provided":
      return 0;
      break;
    case "NZ bank deposit":
      return 1;
      break;
    case "Credit Card":
      return 2;
      break;
    case "Cash":
      return 4;
      break;
    case "Safe Trader (Now obsolete)":
      return 8;
      break;
    case "Other":
      return 16;
      break;
    case "Ping":
      return 32;
      break;
    case "Afterpay":
      return 64;
      break;

    default:
      return "Payment Method is not valid";
  }
};

export const GENERAL_ITEM_LISTING_BOOLEAN = {
  AuthenticatedMembersOnly: false,
  ExcludeFromShippingPromotion: false,
  HasAgreedWithLegalNotice: false,
  HasGallery: false,
  HasGalleryPlus: false,
  HasGoodFor2Relists: false,
  HasSuperFeature: false,
  IsBold: false,
  IsBrandNew: false,
  IsBranded: false,
  IsClassified: false,
  IsClearance: false,
  IsCounterOffersAllowed: false,
  IsFeatured: false,
  IsFlatShippingCharge: false,
  IsHighlighted: false,
  IsHomepageFeatured: false,
  IsOrNearOffer: false,
  IsPriceOnApplication: false,
  ReturnListingDetails: false,
  SendPaymentInstructions: false,
};

export const GENERAL_ITEM_LISTING_STRING = {
  CatalogueId: "ABC",
  Category: "ABC",
  EndDateTime: "/Date(1514764800)/",
  ExternalReferenceId: "ABC",
  HomePhoneNumber: "ABC",
  MobilePhoneNumber: "ABC",
  OtherPaymentMethod: "ABC",
  PremiumPackageCode: "ABC",
  SKU: "ABC",
  SecondCategory: "ABC",
  ShortDescription: "ABC",
  Subtitle: "ABC",
  Title: "ABC",
};

export const GENERAL_ITEM_LISTING_NUMBER = {
  AutoRelistLimit: 123,
  BuyNowPrice: 123,
  DonationRecipient: 0,
  Duration: 0,
  MaximumOffers: 123,
  Pickup: 0,
  PickupSuburbId: 123,
  PromotionId: 123,
  Quantity: 123,
  RemainingGalleryPlusRelists: 123,
  ReservePrice: 123,
  ShippingTemplateId: 123,
  StartPrice: 123,
  WasPrice: 123,
};

export const GENERAL_ITEM_LISTING_ARRAY = {
  Description: ["ABC", "ABC"],
  OpenHomes: [
    {
      Start: "/Date(1514764800)/",
      End: "/Date(1514764800)/",
    },
    {
      Start: "/Date(1514764800)/",
      End: "/Date(1514764800)/",
    },
  ],
  PhotoIds: [123, 123],
  ShippingOptions: [
    {
      Type: 0,
      Price: 123.0,
      Method: "ABC",
      ShippingId: 123,
      TaxesIncluded: [
        {
          Type: 1,
          Country: "ABC",
          Name: "ABC",
          FlatRate: 123.0,
          Description: "ABC",
          IsSellRestrictionsEffective: false,
          IsTaxEffective: false,
          IsApplied: false,
          TaxAmount: 123.0,
          WasPriceTaxAmount: 123.0,
        },
        {
          Type: 1,
          Country: "ABC",
          Name: "ABC",
          FlatRate: 123.0,
          Description: "ABC",
          IsSellRestrictionsEffective: false,
          IsTaxEffective: false,
          IsApplied: false,
          TaxAmount: 123.0,
          WasPriceTaxAmount: 123.0,
        },
      ],
    },
    {
      Type: 0,
      Price: 123.0,
      Method: "ABC",
      ShippingId: 123,
      TaxesIncluded: [
        {
          Type: 1,
          Country: "ABC",
          Name: "ABC",
          FlatRate: 123.0,
          Description: "ABC",
          IsSellRestrictionsEffective: false,
          IsTaxEffective: false,
          IsApplied: false,
          TaxAmount: 123.0,
          WasPriceTaxAmount: 123.0,
        },
        {
          Type: 1,
          Country: "ABC",
          Name: "ABC",
          FlatRate: 123.0,
          Description: "ABC",
          IsSellRestrictionsEffective: false,
          IsTaxEffective: false,
          IsApplied: false,
          TaxAmount: 123.0,
          WasPriceTaxAmount: 123.0,
        },
      ],
    },
  ],
  PaymentMethods: [0, 0],
  Attributes: [
    {
      Name: "ABC",
      DisplayName: "ABC",
      Value: "ABC",
      Type: 0,
      Range: {
        Lower: "ABC",
        Upper: "ABC",
      },
      MaxStringLength: 123,
      Options: [
        {
          Value: "ABC",
          Display: "ABC",
          Count: 123,
        },
        {
          Value: "ABC",
          Display: "ABC",
          Count: 123,
        },
      ],
      Units: [
        {
          Display: "ABC",
          Multiplier: 123.0,
        },
        {
          Display: "ABC",
          Multiplier: 123.0,
        },
      ],
      Unit: "ABC",
      IsRequiredForSell: false,
      GroupName: "ABC",
      DisplayValue: "ABC",
    },
    {
      Name: "ABC",
      DisplayName: "ABC",
      Value: "ABC",
      Type: 0,
      Range: {
        Lower: "ABC",
        Upper: "ABC",
      },
      MaxStringLength: 123,
      Options: [
        {
          Value: "ABC",
          Display: "ABC",
          Count: 123,
        },
        {
          Value: "ABC",
          Display: "ABC",
          Count: 123,
        },
      ],
      Units: [
        {
          Display: "ABC",
          Multiplier: 123.0,
        },
        {
          Display: "ABC",
          Multiplier: 123.0,
        },
      ],
      Unit: "ABC",
      IsRequiredForSell: false,
      GroupName: "ABC",
      DisplayValue: "ABC",
    },
  ],
  Contacts: [
    {
      FullName: "ABC",
      PhoneNumber: "ABC",
      AlternatePhoneNumber: "ABC",
      EMail: "ABC",
      BrandingImageId: 123,
      AgentId: "ABC",
      AgencyName: "ABC",
      ShouldContact: 0,
    },
    {
      FullName: "ABC",
      PhoneNumber: "ABC",
      AlternatePhoneNumber: "ABC",
      EMail: "ABC",
      BrandingImageId: 123,
      AgentId: "ABC",
      AgencyName: "ABC",
      ShouldContact: 0,
    },
  ],
  AvailablePromotions: [
    {
      Id: 123,
      Name: "ABC",
      Description: "ABC",
      LongDescription: "ABC",
      Price: 123.0,
      OriginalPrice: 123.0,
      Recommended: false,
      MinimumPhotoCount: 123,
      DiscountDescription: "ABC",
      DiscountStartDate: "ABC",
      DiscountEndDate: "ABC",
      DiscountDisclaimer: "ABC",
      GoodFor2RelistsFee: 123.0,
    },
    {
      Id: 123,
      Name: "ABC",
      Description: "ABC",
      LongDescription: "ABC",
      Price: 123.0,
      OriginalPrice: 123.0,
      Recommended: false,
      MinimumPhotoCount: 123,
      DiscountDescription: "ABC",
      DiscountStartDate: "ABC",
      DiscountEndDate: "ABC",
      DiscountDisclaimer: "ABC",
      GoodFor2RelistsFee: 123.0,
    },
  ],
  ImmutableFields: ["ABC", "ABC"],
  ListingExtras: [
    {
      Id: 123,
      Name: "ABC",
      Variant: "ABC",
      StartDate: "/Date(1514764800)/",
      EndDate: "/Date(1514764800)/",
      Description: "ABC",
      Duration: 123,
      Delay: 123,
    },
    {
      Id: 123,
      Name: "ABC",
      Variant: "ABC",
      StartDate: "/Date(1514764800)/",
      EndDate: "/Date(1514764800)/",
      Description: "ABC",
      Duration: 123,
      Delay: 123,
    },
  ],
  ListingExtrasLedger: [{}, {}],
  Photos: [
    {
      Key: 123,
      Value: {},
    },
    {
      Key: 123,
      Value: {},
    },
  ],
};

export const GENERAL_ITEM_LISTING_OBJECT = {
  GeographicLocation: {
    Latitude: 123.0,
    Longitude: 123.0,
    Accuracy: 0,
  },
  EmbeddedContent: {
    YouTubeVideoKey: "ABC",
    MatterportKey: "ABC",
    IStagingKey: "ABC",
    VimeoVideoKey: "ABC",
    DiakritFurnishKey: "ABC",
    DiakritStylerKey: "ABC",
    DiakritPanoramaKey: "ABC",
    VirtualToursCreatorKey: "ABC",
    Approved3DTourUrl: "ABC",
  },
  ShippingCalculatorInputs: {
    IsBoxType: false,
    Width: 123.0,
    Height: 123.0,
    Depth: 123.0,
    IsSignatureRequired: false,
    PickupLocalityId: 123,
    IsRural: false,
    PackagingOption: 1,
    WeightOption: 1,
    FilterOption: 0,
  },
  AdditionalData: {
    BulletPoints: ["ABC", "ABC"],
    Tags: [
      {
        Name: "ABC",
      },
      {
        Name: "ABC",
      },
    ],
  },
  VariantDefinition: {
    OptionSets: [
      {
        Name: "ABC",
        Values: ["ABC", "ABC"],
      },
      {
        Name: "ABC",
        Values: ["ABC", "ABC"],
      },
    ],
    Variants: [
      {
        SKU: "ABC",
        Price: 123.0,
        IsClearance: false,
        WasPrice: 123.0,
        Quantity: 123,
        PhotoIds: [123, 123],
        Photos: [
          {
            Key: 123,
            Value: {
              Thumbnail: "ABC",
              List: "ABC",
              Medium: "ABC",
              Gallery: "ABC",
              Large: "ABC",
              FullSize: "ABC",
              PlusSize: "ABC",
              PhotoId: 123,
              OriginalWidth: 123,
              OriginalHeight: 123,
            },
          },
          {
            Key: 123,
            Value: {
              Thumbnail: "ABC",
              List: "ABC",
              Medium: "ABC",
              Gallery: "ABC",
              Large: "ABC",
              FullSize: "ABC",
              PlusSize: "ABC",
              PhotoId: 123,
              OriginalWidth: 123,
              OriginalHeight: 123,
            },
          },
        ],
        Options: [
          {
            Name: "ABC",
            Value: "ABC",
          },
          {
            Name: "ABC",
            Value: "ABC",
          },
        ],
        Attributes: [{}, {}],
        ListingId: 123,
        ExternalReferenceId: "ABC",
        ProductSpecification: {
          GTIN: "ABC",
          Brand: "ABC",
          ManufacturerCode: "ABC",
        },
      },
      {
        SKU: "ABC",
        Price: 123.0,
        IsClearance: false,
        WasPrice: 123.0,
        Quantity: 123,
        PhotoIds: [123, 123],
        Photos: [
          {
            Key: 123,
            Value: {
              Thumbnail: "ABC",
              List: "ABC",
              Medium: "ABC",
              Gallery: "ABC",
              Large: "ABC",
              FullSize: "ABC",
              PlusSize: "ABC",
              PhotoId: 123,
              OriginalWidth: 123,
              OriginalHeight: 123,
            },
          },
          {
            Key: 123,
            Value: {
              Thumbnail: "ABC",
              List: "ABC",
              Medium: "ABC",
              Gallery: "ABC",
              Large: "ABC",
              FullSize: "ABC",
              PlusSize: "ABC",
              PhotoId: 123,
              OriginalWidth: 123,
              OriginalHeight: 123,
            },
          },
        ],
        Options: [
          {
            Name: "ABC",
            Value: "ABC",
          },
          {
            Name: "ABC",
            Value: "ABC",
          },
        ],
        Attributes: [{}, {}],
        ListingId: 123,
        ExternalReferenceId: "ABC",
        ProductSpecification: {
          GTIN: "ABC",
          Brand: "ABC",
          ManufacturerCode: "ABC",
        },
      },
    ],
  },
  ProductSpecification: {},
};

export const GENERAL_ITEM_LISTING_FORMAT = {
  // Category: "ABC",
  Title: "ABC",
  // Subtitle: "ABC",
  Description: [""],
  StartPrice: 123.0,
  ReservePrice: 123.0,
  BuyNowPrice: 123.0,
  Duration: 7,
  // EndDateTime: "/Date(1514764800)/",
  Pickup: 3,
  // PickupSuburbId: 123,
  IsBrandNew: true,
  // AuthenticatedMembersOnly: false,
  IsClassified: false,
  // OpenHomes: [
  //   {
  //     Start: "/Date(1514764800)/",
  //     End: "/Date(1514764800)/",
  //   },
  //   {
  //     Start: "/Date(1514764800)/",
  //     End: "/Date(1514764800)/",
  //   },
  // ],
  // SendPaymentInstructions: false,
  // OtherPaymentMethod: "ABC",
  // IsOrNearOffer: false,
  // IsPriceOnApplication: false,
  // IsBold: false,
  // IsFeatured: false,
  // IsHomepageFeatured: false,
  // HasGallery: false,
  // HasGalleryPlus: false,
  // Quantity: 123,
  IsFlatShippingCharge: true,
  // HasAgreedWithLegalNotice: false,
  // AutoRelistLimit: 123,
  // HomePhoneNumber: "ABC",
  // MobilePhoneNumber: "ABC",
  // IsHighlighted: false,
  // HasSuperFeature: false,
  // PhotoIds: [123, 123],
  ShippingOptions: [
    {
      Type: 1,
      Price: 12.0,
      Method: "ABC",
      ShippingId: 1,
      TaxesIncluded: [
        {
          Type: 1,
          Country: "ABC",
          Name: "ABC",
          FlatRate: 123.0,
          Description: "ABC",
          IsSellRestrictionsEffective: false,
          IsTaxEffective: false,
          IsApplied: false,
          TaxAmount: 123.0,
          WasPriceTaxAmount: 123.0,
        },
        {
          Type: 1,
          Country: "ABC",
          Name: "ABC",
          FlatRate: 123.0,
          Description: "ABC",
          IsSellRestrictionsEffective: false,
          IsTaxEffective: false,
          IsApplied: false,
          TaxAmount: 123.0,
          WasPriceTaxAmount: 123.0,
        },
      ],
    },
    {
      Type: 2,
      Price: 13.0,
      Method: "ABC",
      ShippingId: 2,
      TaxesIncluded: [
        {
          Type: 1,
          Country: "ABC",
          Name: "ABC",
          FlatRate: 123.0,
          Description: "ABC",
          IsSellRestrictionsEffective: false,
          IsTaxEffective: false,
          IsApplied: false,
          TaxAmount: 123.0,
          WasPriceTaxAmount: 123.0,
        },
        {
          Type: 1,
          Country: "ABC",
          Name: "ABC",
          FlatRate: 123.0,
          Description: "ABC",
          IsSellRestrictionsEffective: false,
          IsTaxEffective: false,
          IsApplied: false,
          TaxAmount: 123.0,
          WasPriceTaxAmount: 123.0,
        },
      ],
    },
  ],
  PaymentMethods: [1, 2],
  // Attributes: [
  //   {
  //     Name: "ABC",
  //     DisplayName: "ABC",
  //     Value: "ABC",
  //     Type: 0,
  //     Range: {
  //       Lower: "ABC",
  //       Upper: "ABC",
  //     },
  //     MaxStringLength: 123,
  //     Options: [
  //       {
  //         Value: "ABC",
  //         Display: "ABC",
  //         Count: 123,
  //       },
  //       {
  //         Value: "ABC",
  //         Display: "ABC",
  //         Count: 123,
  //       },
  //     ],
  //     Units: [
  //       {
  //         Display: "ABC",
  //         Multiplier: 123.0,
  //       },
  //       {
  //         Display: "ABC",
  //         Multiplier: 123.0,
  //       },
  //     ],
  //     Unit: "ABC",
  //     IsRequiredForSell: false,
  //     GroupName: "ABC",
  //     DisplayValue: "ABC",
  //   },
  //   {
  //     Name: "ABC",
  //     DisplayName: "ABC",
  //     Value: "ABC",
  //     Type: 0,
  //     Range: {
  //       Lower: "ABC",
  //       Upper: "ABC",
  //     },
  //     MaxStringLength: 123,
  //     Options: [
  //       {
  //         Value: "ABC",
  //         Display: "ABC",
  //         Count: 123,
  //       },
  //       {
  //         Value: "ABC",
  //         Display: "ABC",
  //         Count: 123,
  //       },
  //     ],
  //     Units: [
  //       {
  //         Display: "ABC",
  //         Multiplier: 123.0,
  //       },
  //       {
  //         Display: "ABC",
  //         Multiplier: 123.0,
  //       },
  //     ],
  //     Unit: "ABC",
  //     IsRequiredForSell: false,
  //     GroupName: "ABC",
  //     DisplayValue: "ABC",
  //   },
  // ],
  // IsClearance: false,
  // ExternalReferenceId: "ABC",
  // Contacts: [
  //   {
  //     FullName: "ABC",
  //     PhoneNumber: "ABC",
  //     AlternatePhoneNumber: "ABC",
  //     EMail: "ABC",
  //     BrandingImageId: 123,
  //     AgentId: "ABC",
  //     AgencyName: "ABC",
  //     ShouldContact: 0,
  //   },
  //   {
  //     FullName: "ABC",
  //     PhoneNumber: "ABC",
  //     AlternatePhoneNumber: "ABC",
  //     EMail: "ABC",
  //     BrandingImageId: 123,
  //     AgentId: "ABC",
  //     AgencyName: "ABC",
  //     ShouldContact: 0,
  //   },
  // ],
  // ReturnListingDetails: true,
  // DonationRecipient: 0,
  // CatalogueId: "ABC",
  // RemainingGalleryPlusRelists: 123,
  // PromotionId: 123,
  // ExcludeFromShippingPromotion: false,
  // SKU: "ABC",
  // AvailablePromotions: [
  //   {
  //     Id: 123,
  //     Name: "ABC",
  //     Description: "ABC",
  //     LongDescription: "ABC",
  //     Price: 123.0,
  //     OriginalPrice: 123.0,
  //     Recommended: false,
  //     MinimumPhotoCount: 123,
  //     DiscountDescription: "ABC",
  //     DiscountStartDate: "ABC",
  //     DiscountEndDate: "ABC",
  //     DiscountDisclaimer: "ABC",
  //     GoodFor2RelistsFee: 123.0,
  //   },
  //   {
  //     Id: 123,
  //     Name: "ABC",
  //     Description: "ABC",
  //     LongDescription: "ABC",
  //     Price: 123.0,
  //     OriginalPrice: 123.0,
  //     Recommended: false,
  //     MinimumPhotoCount: 123,
  //     DiscountDescription: "ABC",
  //     DiscountStartDate: "ABC",
  //     DiscountEndDate: "ABC",
  //     DiscountDisclaimer: "ABC",
  //     GoodFor2RelistsFee: 123.0,
  //   },
  // ],
  // ImmutableFields: ["ABC", "ABC"],
  // GeographicLocation: {
  //   Latitude: 123.0,
  //   Longitude: 123.0,
  //   Accuracy: 0,
  // },
  // WasPrice: 123.0,
  // EmbeddedContent: {
  //   YouTubeVideoKey: "ABC",
  //   MatterportKey: "ABC",
  //   IStagingKey: "ABC",
  //   VimeoVideoKey: "ABC",
  //   DiakritFurnishKey: "ABC",
  //   DiakritStylerKey: "ABC",
  //   DiakritPanoramaKey: "ABC",
  //   VirtualToursCreatorKey: "ABC",
  //   Approved3DTourUrl: "ABC",
  // },
  // IsBranded: false,
  // ShortDescription: "ABC",
  // ShippingCalculatorInputs: {
  //   IsBoxType: false,
  //   Width: 123.0,
  //   Height: 123.0,
  //   Depth: 123.0,
  //   IsSignatureRequired: false,
  //   PickupLocalityId: 123,
  //   IsRural: false,
  //   PackagingOption: 1,
  //   WeightOption: 1,
  //   FilterOption: 0,
  // },
  // AdditionalData: {
  //   BulletPoints: ["ABC", "ABC"],
  //   Tags: [
  //     {
  //       Name: "ABC",
  //     },
  //     {
  //       Name: "ABC",
  //     },
  //   ],
  // },
  // VariantDefinition: {
  //   OptionSets: [
  //     {
  //       Name: "ABC",
  //       Values: ["ABC", "ABC"],
  //     },
  //     {
  //       Name: "ABC",
  //       Values: ["ABC", "ABC"],
  //     },
  //   ],
  //   Variants: [
  //     {
  //       SKU: "ABC",
  //       Price: 123.0,
  //       IsClearance: false,
  //       WasPrice: 123.0,
  //       Quantity: 123,
  //       PhotoIds: [123, 123],
  //       Photos: [
  //         {
  //           Key: 123,
  //           Value: {
  //             Thumbnail: "ABC",
  //             List: "ABC",
  //             Medium: "ABC",
  //             Gallery: "ABC",
  //             Large: "ABC",
  //             FullSize: "ABC",
  //             PlusSize: "ABC",
  //             PhotoId: 123,
  //             OriginalWidth: 123,
  //             OriginalHeight: 123,
  //           },
  //         },
  //         {
  //           Key: 123,
  //           Value: {
  //             Thumbnail: "ABC",
  //             List: "ABC",
  //             Medium: "ABC",
  //             Gallery: "ABC",
  //             Large: "ABC",
  //             FullSize: "ABC",
  //             PlusSize: "ABC",
  //             PhotoId: 123,
  //             OriginalWidth: 123,
  //             OriginalHeight: 123,
  //           },
  //         },
  //       ],
  //       Options: [
  //         {
  //           Name: "ABC",
  //           Value: "ABC",
  //         },
  //         {
  //           Name: "ABC",
  //           Value: "ABC",
  //         },
  //       ],
  //       Attributes: [{}, {}],
  //       ListingId: 123,
  //       ExternalReferenceId: "ABC",
  //       ProductSpecification: {
  //         GTIN: "ABC",
  //         Brand: "ABC",
  //         ManufacturerCode: "ABC",
  //       },
  //     },
  //     {
  //       SKU: "ABC",
  //       Price: 123.0,
  //       IsClearance: false,
  //       WasPrice: 123.0,
  //       Quantity: 123,
  //       PhotoIds: [123, 123],
  //       Photos: [
  //         {
  //           Key: 123,
  //           Value: {
  //             Thumbnail: "ABC",
  //             List: "ABC",
  //             Medium: "ABC",
  //             Gallery: "ABC",
  //             Large: "ABC",
  //             FullSize: "ABC",
  //             PlusSize: "ABC",
  //             PhotoId: 123,
  //             OriginalWidth: 123,
  //             OriginalHeight: 123,
  //           },
  //         },
  //         {
  //           Key: 123,
  //           Value: {
  //             Thumbnail: "ABC",
  //             List: "ABC",
  //             Medium: "ABC",
  //             Gallery: "ABC",
  //             Large: "ABC",
  //             FullSize: "ABC",
  //             PlusSize: "ABC",
  //             PhotoId: 123,
  //             OriginalWidth: 123,
  //             OriginalHeight: 123,
  //           },
  //         },
  //       ],
  //       Options: [
  //         {
  //           Name: "ABC",
  //           Value: "ABC",
  //         },
  //         {
  //           Name: "ABC",
  //           Value: "ABC",
  //         },
  //       ],
  //       Attributes: [{}, {}],
  //       ListingId: 123,
  //       ExternalReferenceId: "ABC",
  //       ProductSpecification: {
  //         GTIN: "ABC",
  //         Brand: "ABC",
  //         ManufacturerCode: "ABC",
  //       },
  //     },
  //   ],
  // },
  // SecondCategory: "ABC",
  // PremiumPackageCode: "ABC",
  // ProductSpecification: {},
  // ListingExtras: [
  //   {
  //     Id: 123,
  //     Name: "ABC",
  //     Variant: "ABC",
  //     StartDate: "/Date(1514764800)/",
  //     EndDate: "/Date(1514764800)/",
  //     Description: "ABC",
  //     Duration: 123,
  //     Delay: 123,
  //   },
  //   {
  //     Id: 123,
  //     Name: "ABC",
  //     Variant: "ABC",
  //     StartDate: "/Date(1514764800)/",
  //     EndDate: "/Date(1514764800)/",
  //     Description: "ABC",
  //     Duration: 123,
  //     Delay: 123,
  //   },
  // ],
  // ListingExtrasLedger: [{}, {}],
  // HasGoodFor2Relists: false,
  // IsCounterOffersAllowed: false,
  // MaximumOffers: 123,
  // ShippingTemplateId: 123,
  // Photos: [
  //   {
  //     Key: 123,
  //     Value: {},
  //   },
  //   {
  //     Key: 123,
  //     Value: {},
  //   },
  // ],
};

export const SHIPPING_OPTIONS = {};

const LISTING_EXAMPLE = {
  Category: "3849",
  title: "Arty surprise",
  Description: ["All true art lovers will buy this."],
  StartPrice: 100,
  BuyNowPrice: 200,
  Duration: 7,
  Pickup: 1,
  IsBrandNew: true,
  PhotoIds: [12345678],
  ShippingOptions: [],
  PaymentMethod: [1, 2],
};
