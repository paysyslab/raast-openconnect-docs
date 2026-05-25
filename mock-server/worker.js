/**
 * RAAST OpenConnect — Cloudflare Worker Mock API
 * Returns realistic mock responses for all 5 modules.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });

// ─── Mock response library ────────────────────────────────────────
const MOCKS = {

  // AUTH
  '/authenticate': {
    token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0fGliIiwiZXhwIjoxNjI1OTEyNzY3fQ.mock_token_value',
    expiry: '1625912767',
  },

  '/realms/paysys-raast-realm/protocol/openid-connect/token': {
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.mock_keycloak_token',
    expires_in: 300,
    refresh_expires_in: 0,
    token_type: 'Bearer',
    'not-before-policy': 0,
    scope: 'profile email',
  },

  // BULK SENDING
  '/api/v1/paysyslabs/bulksending/preval': {
    response_code: '00',
    response_desc: 'SUCCESS',
    batch_id: 'BATCH20210526001',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/bulksending/payment': {
    response_code: '00',
    response_desc: 'SUCCESS',
    batch_id: 'BATCH20210526001',
    correlationId: 'axxansayyysaii965sa2asasannsas',
    messageId: 'JJHHK1222333665',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/bulksending/paymentinquiry': {
    response_code: '00',
    response_desc: 'SUCCESS',
    batch_id: 'BATCH20210526001',
    status: 'COMPLETED',
    total_transactions: 5,
    successful: 5,
    failed: 0,
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/bulksending/prevalinquiry': {
    response_code: '00',
    response_desc: 'SUCCESS',
    batch_id: 'BATCH20210526001',
    status: 'PREVAL_SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/bulksending/paymentinquiryV2': {
    response_code: '00',
    response_desc: 'SUCCESS',
    batch_id: 'BATCH20210526001',
    transactions: [
      { transaction_id: 'TXN001', status: 'SUCCESS', amount: 50000 },
      { transaction_id: 'TXN002', status: 'SUCCESS', amount: 75000 },
    ],
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/bulksending/swaps/inquiry': {
    response_code: '00',
    response_desc: 'SUCCESS',
    challanNo: 'CHN123456',
    psid: 'PSID789012',
    amount: 50000,
    taxpayerName: 'ABC Corporation',
    dueDate: '2021-06-30',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/bulksending/swaps/batchstatus': {
    response_code: '00',
    response_desc: 'SUCCESS',
    batchStatus: 'SUBMITTED_TO_FBR',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/bulksending/tax/payment': {
    response_code: '00',
    response_desc: 'SUCCESS',
    batch_id: 'TAXBATCH20210526001',
    correlationId: 'tax-axxansayyysaii965sa2asas',
    rrn: '000000123456',
    stan: '123456',
  },

  // P2P — INSTITUTIONS & TITLE FETCH
  '/api/v1/paysyslabs/banklist': {
    response: {
      response_code: '00',
      response_desc: 'SUCCESS',
      participants: [
        { bic: 'ABPAPKKA', participant_name: 'Allied Bank Limited' },
        { bic: 'ALFHPKKA', participant_name: 'Bank Alfalah Limited' },
        { bic: 'ASCMPKKA', participant_name: 'Askari Bank Limited' },
        { bic: 'BAHLPKKA', participant_name: 'Bank Al Habib Limited' },
        { bic: 'HABLPKKA', participant_name: 'Habib Bank Limited' },
        { bic: 'MEZNPKKA', participant_name: 'Meezan Bank Limited' },
        { bic: 'MCBPPKKA', participant_name: 'MCB Bank Limited' },
        { bic: 'NBPAPKKA', participant_name: 'National Bank of Pakistan' },
        { bic: 'SCBLPKKX', participant_name: 'Standard Chartered Bank Pakistan' },
        { bic: 'UNILPKKA', participant_name: 'United Bank Limited' },
      ],
    },
    rrn: '001013342715',
    stan: '342715',
  },

  '/api/v1/paysyslabs/titlefetch': {
    response: {
      response_code: '00',
      'account-information': {
        acctitle: 'Muhammad Waqas Khan',
        acctype: 'Account',
      },
      response_desc: 'SUCCESS',
      fee: 0,
    },
    stan: '012012',
    rrn: '012012012012',
  },

  // P2P — REGISTRATION
  '/api/v1/paysyslabs/cas/onestepreg': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/customerreg': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    customerId: 'CUST-20210526-001',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/regcaa': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/synccustomer': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/changecustomerstatus': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/updatecustomerinfo': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/unregistercustomer': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  // P2P — ALIAS MANAGEMENT
  '/api/v1/paysyslabs/cas/changealiasstatus': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/updatealias': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/linkalias': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/unlinkalias': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  // P2P — ACCOUNT MANAGEMENT
  '/api/v1/paysyslabs/cas/defaultaccount': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/deleteaccount': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/cas/linkaccount': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  // P2P — PAYMENTS
  '/api/v1/paysyslabs/payment': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'axxansayyysaii965sa2asasannsas',
    messageId: 'JJHHK1222333665',
    instructionId: 'JJHHK1222333665',
    transactionId: 'JJHHK1222333665',
  },

  '/api/v2/paysyslabs/payment': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'axxansayyysaii965sa2asasannsas',
    messageId: 'JJHHK1222333665',
  },

  '/api/v3/paysyslabs/payment': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'axxansayyysaii965sa2asasannsas',
    messageId: 'JJHHK1222333665',
    instructionId: 'JJHHK1222333665',
    transactionId: 'JJHHK1222333665',
  },

  '/api/v3/paysyslabs/directposting': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'axxansayyysaii965sa2asasannsas',
    messageId: 'JJHHK1222333665',
    instructionId: 'JJHHK1222333665',
    transactionId: 'JJHHK1222333665',
  },

  '/api/v4/paysyslabs/payment': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'axxansayyysaii965sa2asasannsas',
    messageId: 'JJHHK1222333665',
  },

  // P2P — INQUIRY
  '/api/v1/paysyslabs/creditinquiry': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
  },

  '/api/v1/paysyslabs/creditinquiryv3': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'axxansayyysaii965sa2asasannsas',
    messageId: 'JJHHK1222333665',
    instructionId: 'JJHHK1222333665',
    transactionId: 'JJHHK1222333665',
  },

  '/api/v1/paysyslabs/getdefaultaccountbyaliasid': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    iban: 'PK26AIIN1234567890000056',
    accountTitle: 'Muhammad Waqas',
    participantCode: 'ABPAPKKA',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/getcustomeraliases': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    aliases: [
      { type: 'MOBILE', value: '03001234567', status: 'active' },
      { type: 'CNIC', value: '4130334100824', status: 'active' },
    ],
    rrn: '000000123456',
    stan: '123456',
  },

  // P2P — LIMITS
  '/api/v1/paysyslabs/getlimit': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    dailyLimit: 1000000,
    perTransactionLimit: 250000,
    dailyUsed: 50000,
    remainingLimit: 950000,
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/setlimit': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  // P2M — CUSTOMER INITIATED
  '/api/v1/paysyslabs/p2m/sqrc/payment': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'p2m-axxansayyysaii965sa2asas',
    messageId: 'P2MJJHHK1222333665',
    instructionId: 'P2MJJHHK1222333665',
    transactionId: 'P2MJJHHK1222333665',
  },

  '/api/v1/paysyslabs/p2m/payalias': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'alias-axxansayyysaii965sa2asas',
    messageId: 'ALIASJJHHK1222333665',
  },

  '/api/v1/paysyslabs/p2m/merchantaliasinquiry': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    merchantName: 'Gourmet Bakery Lahore',
    merchantIban: 'PK56AIIN0000000000000999',
    participantCode: 'HABLPKKA',
    rrn: '000000123456',
    stan: '123456',
  },

  // P2M — MERCHANT INITIATED
  '/api/v1/paysyslabs/p2m/dqrc/payment': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'dqrc-axxansayyysaii965sa2asas',
    messageId: 'DQRCJJHHK1222333665',
  },

  '/api/v1/paysyslabs/p2m/rtpl': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rtpId: 'RTP-20210526-001',
    expiresAt: '2021-05-26T13:25:50',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/p2m/rtpn': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rtpId: 'RTP-20210526-002',
    expiresAt: '2021-05-26T13:25:50',
    rrn: '000000123456',
    stan: '123456',
  },

  '/api/v1/paysyslabs/p2m/rtp/acceptance': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    rrn: '000000123456',
    stan: '123456',
  },

  // P2M — CHANNEL
  '/api/v1/paysyslabs/p2m/paymentinquiry': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    status: 'SUCCESS',
    amount: 1500.00,
    merchantName: 'Gourmet Bakery Lahore',
    transactionDate: '2021-05-26',
    rrn: '000000123456',
    stan: '123456',
  },

  // PISP
  '/api/v1/paysyslabs/pisp/consent/status': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
  },

  '/api/v1/paysyslabs/pisp/consentDetails': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
    accounts: [
      {
        account: 'PKABPKA80299910920312',
        consentId: 'd01b5fd6-8276-4f88-b672-cb1040245caa',
        scopes: ['inquiry', 'account_transfer', 'bill_payment'],
        accountTitle: 'Muhammad Waqas',
        status: 'APPROVED',
        senderParticipantCode: 'HABLPKKA',
        issuedDateTime: '20241106120149',
        approvedDateTime: '20241106120149',
      },
    ],
    receiverParticipantCode: 'ABPAPKKA',
  },

  '/api/v1/paysyslabs/pisp/consentRevoked': {
    responseCode: '00',
    responseDesc: 'SUCCESS',
  },

  // REMITTANCE
  '/api/v3/paysyslabs/remittance/payment': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'rem-axxansayyysaii965sa2asasannsas',
    messageId: 'REMJJHHK1222333665',
    instructionId: 'REMJJHHK1222333665',
    transactionId: 'REMJJHHK1222333665',
  },

  '/api/v3/paysyslabs/remittance/directposting': {
    response: { response_code: '00', response_desc: 'SUCCESS' },
    stan: '010123',
    rrn: '010123010123',
    correlationId: 'remdp-axxansayyysaii965sa2asasannsas',
    messageId: 'REMDPJJHHK1222333665',
    instructionId: 'REMDPJJHHK1222333665',
    transactionId: 'REMDPJJHHK1222333665',
  },
};

// ─── Main handler ─────────────────────────────────────────────────
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // Health check
    if (path === '/' || path === '/health') {
      return json({ status: 'ok', service: 'RAAST OpenConnect Mock API', version: '1.0.0' });
    }

    // Find matching mock response (exact match first, then prefix match)
    let responseData = MOCKS[path];

    if (!responseData) {
      // Try prefix matching for paths with query params or slight variations
      const matchedKey = Object.keys(MOCKS).find(
        (k) => path.startsWith(k) || k.startsWith(path)
      );
      if (matchedKey) responseData = MOCKS[matchedKey];
    }

    if (responseData) {
      // Add dynamic fields
      const now = new Date();
      const enriched = {
        ...responseData,
        _mock: true,
        _timestamp: now.toISOString(),
        _path: path,
      };
      return json(enriched);
    }

    // 404 fallback
    return json(
      {
        response_code: '404',
        response_desc: 'Endpoint not found in mock server',
        path,
        availableEndpoints: Object.keys(MOCKS),
      },
      404
    );
  },
};
