import convict from 'convict';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
});

const configObject = convict({
  port: {
    doc: 'The port to bind.',
    format: Number,
    default: 3000,
    env: 'PORT',
  },
  logLevel: {
    doc: 'The log level of the application',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL',
  },
  databaseUrl: {
    doc: 'URL of the database',
    format: String,
    default: 'postgres://user:password@localhost:5432/db',
    env: 'DATABASE_URL',
  },
  databaseUseSSL: {
    doc: 'Use ssl when connecting',
    format: Boolean,
    default: false,
    env: 'DATABASE_USE_SSL',
  },
  cookie: {
    secret: {
      doc: 'The secret for the cookies',
      format: String,
      default: 'secret',
      env: 'COOKIE_SECRET',
    },
    resetPasswordTokenExp: {
      doc: 'The reset pwd token expiry time',
      format: String,
      default: '1d',
      env: 'RESET_TOKEN_EXP',
    },
    twoFATokenExp: {
      doc: 'The 2FA JWT token expiry time',
      format: String,
      default: '1d',
      env: '2FA_TOKEN_EXP',
    },
    sessionTokenExp: {
      doc: 'The session JWT token expiry time',
      format: String,
      default: '1d',
      env: 'SESSION_TOKEN_EXP',
    },
  },
  otp: {
    loginExp: {
      doc: 'The OTP login expiry time',
      format: String,
      default: '1d',
      env: 'OTP_LOGIN_EXP',
    },
  },
  passwordResetUrl: {
    doc: 'Url template for password reset link',
    format: String,
    default: 'http://localhost:3000/auth/reset-password',
    env: 'PASSWORD_RESET_URL',
  },
  sendGrid: {
    secret: {
      doc: 'Sendgrid API Key',
      format: String,
      default: '',
      env: 'SENDGRID_API_SECRET',
    },
    sender: {
      doc: 'Sender',
      format: String,
      default: '',
      env: 'SENGDGRID_SENDER',
    },
    templateId: {
      passwordReset: {
        doc: 'Sendgrid password reset template id',
        format: String,
        default: '',
        env: 'PASSWORD_RESET_SENDGRID_TEMPLATE_ID',
      },
      twoFAOTP: {
        doc: 'Sendgrid twoFA OTP template id',
        format: String,
        default: '',
        env: 'TWO_FA_OTP_SENDGRID_TEMPLATE_ID',
      },
      userRegister: {
        doc: 'Sendgrid user register reset template id',
        format: String,
        default: '',
        env: 'USER_REGISTER_SENDGRID_TEMPLATE',
      },
    },
  },
  aws: {
    resourcesRegion: {
      doc: 'AWS region where the AWS resources are allocated',
      format: String,
      default: '',
      env: 'AWS_RESOURCES_REGION',
    },
    accessKeyID: {
      doc: 'AWS Nagyhazi user credentials ID',
      format: String,
      default: '',
      env: 'AWS_NAGYHAZI_ACCESS_KEY_ID',
    },
    secretAccessKey: {
      doc: 'AWS Nagyhazi user credentials secret access key',
      format: String,
      default: '',
      env: 'AWS_NAGYHAZI_SECRET_ACCESS_KEY',
    },
    signedUrlExpirationTime: {
      doc: 'AWS Nagyhazi signed URL expiration time',
      format: Number,
      default: 3600,
      env: 'AWS_NAGYHAZI_SIGNED_URL_EXPIRATION_TIME',
    },
    userArn: {
      doc: 'AWS Nagyhazi user arn',
      format: String,
      default: '',
      env: 'USER_ARN',
    },
  },
  fileHandler: {
    imagesBucketName: {
      doc: 'AWS S3 bucket name to store the images',
      format: String,
      default: '',
      env: 'IMAGES_BUCKET_NAME',
    },
  },
  pdfGenerator: {
    lambdaFunctionARN: {
      doc: 'HTML to PDF generator lambda function ARN',
      format: String,
      default: '',
      env: 'HTML_TO_PDF_GENERATION_LAMBDA_FUNCTION_ARN',
    },
    pdfsBucketName: {
      doc: 'AWS S3 bucket name to store the generated PDFs',
      format: String,
      default: '',
      env: 'PDFS_BUCKET_NAME',
    },
  },
  featureSwitchers: {
    twoFACheck: {
      doc: 'feature switch 2fa validation on BE side',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_2FA',
    },
    userList: {
      doc: 'feature switch to user list',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_USER_LIST',
    },
    clientList: {
      doc: 'feature switch to client list',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_ClIENT_LIST',
    },
    addEditUser: {
      doc: 'feature switch to add/edit user',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_ADD_EDIT_USER',
    },
    addEditClient: {
      doc: 'feature switch to add/edit client',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_ADD_EDIT_CLIENT',
    },
    itemList: {
      doc: 'feature switch to item list',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_ITEM_LIST',
    },
    addEditItem: {
      doc: 'feature switch to add/edit item',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_ADD_EDIT_ITEM',
    },
    clientOwnedItems: {
      doc: 'feature switch to client owned item list',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_CLIENT_OWNED_ITEM_LIST',
    },
    clientKnockedDownItems: {
      doc: 'feature switch to client knocked down items list',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_CLIENT_KNOCKED_DOWN_ITEM_LIST',
    },
    clientPaddleNumberRegistration: {
      doc: 'feature switch to client paddle number registration',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_CLIENT_PADDLE_NUMBER_REGISTRATION_LIST',
    },
    clientPurchaseOrders: {
      doc: 'feature switch to client purchase orders',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_CLIENT_PURCHASE_ORDERS',
    },
    auctionList: {
      doc: 'feature switch to auction list',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_AUCTION_LIST',
    },
    addEditAuction: {
      doc: 'feature switch to add/edit auction',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_ADD_EDIT_AUCTION',
    },
    auctionItemsList: {
      doc: 'feature switch to auction items list',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_AUCTION_ITEMS_LIST',
    },
    auctionPurchaseOrders: {
      doc: 'feature switch to auction purchase orders',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_AUCTION_PURCHASE_ORDERS',
    },
    auctionPurchaseOrderPaddleNumberRegistration: {
      doc: 'feature switch to auction purchase order paddle number registration',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_AUCTION_PURCHASE_ORDER_PADDLE_NUMBER_REGISTRATION',
    },
    staticForms: {
      doc: 'feature switch to static forms',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_STATIC_FORMS',
    },
    formsLayout: {
      doc: 'feature switch to forms layout',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_FORMS_LAYOUT',
    },
    auctionForms: {
      doc: 'feature switch to auction forms',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_AUCTION_FORMS',
    },
    sellableItemsForms: {
      doc: 'feature switch to sellable items forms',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_SELLABLE_ITEMS_FORMS',
    },
    liveAuctionDisplay: {
      doc: 'feature switch to live auction display screen',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_LIVE_AUCTION_DISPLAY',
    },
    liveAuctionLeader: {
      doc: 'feature switch to live auction leader screen',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_LIVE_AUCTION_LEADER_SCREEN',
    },
    dashboardEventLog: {
      doc: 'feature switch to dashboard event log',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_DASHBOARD_EVENT_LOG',
    },
    dashboardAppraiserStats: {
      doc: 'feature switch to dashboard appraiser stats',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_DASHBOARD_APPRAISER_STATS',
    },
    dashboardAuctionStats: {
      doc: 'feature switch to dashboard auction stats',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_DASHBOARD_AUCTION_STATS',
    },
    adminSettings: {
      doc: 'feature switch to admin settings',
      format: Boolean,
      default: false,
      env: 'FEATURE_SWITCHER_ADMIN_SETTINGS',
    },
  },
  staticForms: {
    paddleRegistration: {
      doc: 'Unsigned URL for paddle registration',
      format: String,
      default: '',
      env: 'PADDLE_REGISTRATION',
    },
    purchaseOrders: {
      doc: 'Unsigned URL for purchase order',
      format: String,
      default: '',
      env: 'PURCHASE_ORDERS',
    },
    warehouseReleaseReceipts: {
      doc: 'Unsigned URL for warehouse release receipts',
      format: String,
      default: '',
      env: 'WAREHOUSE_RELEASE_RECEIPTS',
    },
    auctionRepresentationContract: {
      doc: 'Unsigned URL for auction representation contract',
      format: String,
      default: '',
      env: 'AUCTION_REPRESENTATION_CONTRACT',
    },
    auctionReport: {
      doc: 'Unsigned URL for auction report',
      format: String,
      default: '',
      env: 'AUCTION_REPORT',
    },
    acknowledgementOfReceipt: {
      doc: 'Unsigned URL for acknowledgement of receipt',
      format: String,
      default: '',
      env: 'ACKNOWLEDGEMENT_OF_RECEIPT',
    },
    preparationOfOwnersAccountForClient: {
      doc: 'Unsigned URL for preparation of owners account for client',
      format: String,
      default: '',
      env: 'PREPARATION_OF_OWNERS_ACCOUNT_FOR_CLIENT',
    },
    preparationOfOwnersAccountForAuction: {
      doc: 'Unsigned URL for preparation of owners account for auction',
      format: String,
      default: '',
      env: 'PREPARATION_OF_OWNERS_ACCOUNT_FOR_AUCTION',
    },
    ownersStatement: {
      doc: 'Unsigned URL for owner statement',
      format: String,
      default: '',
      env: 'OWNERS_STATEMENT',
    },
    ordersContract: {
      doc: 'Unsigned URL for ordersContract',
      format: String,
      default: '',
      env: 'ORDERS_CONTRACT',
    },
    receipt: {
      doc: 'Unsigned URL for receipt',
      format: String,
      default: '',
      env: 'RECEIPT',
    },
    purchaseOrdersItemList: {
      doc: 'Unsigned URL for purchase orders item list',
      format: String,
      default: '',
      env: 'PURCHASE_ORDERS_ITEM_LIST',
    },
  },
  injectTestData: {
    doc: 'Datas insert into the database for the tests',
    format: Boolean,
    default: false,
    env: 'INJECT_TEST_DATA',
  },
});

configObject.validate({ allowed: 'warn' });

export const config = configObject.getProperties();
export type Config = typeof config;
