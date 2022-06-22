import { SQLFragment, sql, param } from 'zapatos/db';
import { products, reviews } from 'zapatos/schema';
import { ResultLimits } from '../../../utils/db-utils';

export type ProductsReviewsResult = products.Selectable;

export interface Count {
  count: string;
}

// const obtainWhereSQLStatement = (
//   query: string,
//   startDate?: string | null,
//   endDate?: string | null,
//   classificationID?: string | null
// ): SQLFragment<unknown[], never> => {
//   const whereFragment = sql<
//     products.SQL | reviews.SQL,
//     ProductsReviewsResult[]
//   >`
//     (${'products'}.${'name'} ILIKE ${likeParam(query)}
//         OR ${'items'}.${'sequentialNumber'}::TEXT LIKE ${likeParam(query)}
//         OR ${'items'}.${'auctionNumber'}::VARCHAR LIKE ${likeParam(query)}
//         OR ${'items'}.${'knockdownPrice'}::TEXT LIKE ${likeParam(query)})
//       ${
//         classificationID
//           ? sql` AND ${'classification'} = ${param(classificationID)}`
//           : sql``
//       }
//       ${
//         startDate && endDate
//           ? sql` AND ${'items'}.${'dateOfRegister'} BETWEEN ${param(
//               startDate
//             )} AND ${param(endDate)}`
//           : startDate
//           ? sql` AND ${'items'}.${'dateOfRegister'} >= ${param(startDate)}`
//           : endDate
//           ? sql` AND ${'items'}.${'dateOfRegister'} <= ${param(endDate)}`
//           : sql``
//       }`;
//   return whereFragment;
// };

export type SearchProductsReviewsOrderedByQueryParams = {
  query: string;
  clientId: string;
};

// export const getClientsKnockedDownItemsQuery = ({
//   query,
//   clientId,
// }: SearchProductsReviewsOrderedByQueryParams): {
//   items: SQLFragment<ProductsReviewsResult[]>;
//   count: SQLFragment<Count[], unknown>;
// } => {
//   const itemsFragment = sql<
//     products.SQL | reviews.SQL,
//     ProductsReviewsResult[]
//   >`
//       SELECT
//         items.*
//       FROM
//        ${'purchase_orders'}
//       INNER JOIN ${'clients'}
//         ON ${'purchase_orders'}.${'clientId'} = ${param(clientId)}
//       INNER JOIN ${'purchase_order_item'}
//         ON ${'purchase_order_item'}.${'purchaseOrderId'} = ${'purchase_orders'}.${'id'}
//       INNER JOIN ${'items'}
//         ON ${'items'}.${'id'} = ${'purchase_order_item'}.${'itemId'}
//       INNER JOIN ${'paddle_registrations'}
//         ON ${'paddle_registrations'}.${'paddleNumber'} = ${'purchase_order_item'}.${'paddleNumber'}
//       WHERE
//       ${obtainWhereSQLStatement(query, startDate, endDate, classificationID)}
//       UNION
//       SELECT
//         items.*
//       FROM
//         ${'items'}
//       INNER JOIN ${'paddle_registrations'}
//         ON ${'paddle_registrations'}.${'id'} = ${'items'}.${'paddleRegistrationId'}
//       INNER JOIN ${'clients'}
//         ON ${param(clientId)} = ${'paddle_registrations'}.${'clientId'}
//         WHERE
//       ${obtainWhereSQLStatement(query, startDate, endDate, classificationID)}
//       ORDER BY ${obtainOrderBySQLStatement(orderBy)}
//       ${
//         limits
//           ? sql`LIMIT ${param(limits.limit)} OFFSET ${param(limits.skip)}`
//           : sql``
//       }
//     `;
//   return {
//     items: itemsFragment,
//     count: sql`SELECT COUNT(id) FROM (SELECT
//       items.*
//       FROM
//         ${'items'}
//       INNER JOIN ${'paddle_registrations'}
//         ON ${'paddle_registrations'}.${'id'} = ${'items'}.${'paddleRegistrationId'}
//       INNER JOIN ${'clients'}
//         ON ${'clients'}.${'id'} = ${'paddle_registrations'}.${'clientId'}
//         WHERE
//         ${obtainWhereSQLStatement(query, startDate, endDate, classificationID)}
//       UNION
//       SELECT
//         items.*
//       FROM
//       ${'purchase_orders'}
//       INNER JOIN ${'clients'}
//         ON ${'purchase_orders'}.${'clientId'} = ${'clients'}.${'id'}
//       INNER JOIN ${'purchase_order_item'}
//         ON ${'purchase_order_item'}.${'purchaseOrderId'} = ${'purchase_orders'}.${'id'}
//       INNER JOIN ${'paddle_registrations'}
//         ON ${'paddle_registrations'}.${'paddleNumber'} = ${'purchase_order_item'}.${'paddleNumber'}
//       INNER JOIN ${'items'}
//         ON ${'items'}.${'id'} = ${'purchase_order_item'}.${'itemId'}
//         WHERE
//        ${obtainWhereSQLStatement(query, startDate, endDate, classificationID)}
//       ) src`,
//   };
// };
