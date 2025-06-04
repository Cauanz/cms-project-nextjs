import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const body = evt.data;

    // evt.data.id;
    //evt.data.email_addresses[0].email_address
    //evt.data.first_name

    if (
      !("email_addresses" in body) ||
      !Array.isArray(body.email_addresses) ||
      !body.email_addresses[0]
    ) {
      return NextResponse.json(
        { message: "Payload do webhook não contém email_addresses" },
        { status: 400 }
      );
    }

    const userId = body.id;
    const email = body.email_addresses[0].email_address;
    const name = body.first_name;

    console.log(userId, email, name);

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Usuário já existe" },
        { status: 200 }
      );
    }

    const user = await prisma.user.create({
      data: {
        clerkId: userId,
        name,
        email,
      },
    });

    return NextResponse.json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar um novo usuário", error },
      { status: 500 }
    );
  }
}


//* EXEMPLO PAYLOAD ENVIADO EVENTO USER.CREATED:
/*
Webhook payload: {
  backup_code_enabled: false,
  banned: false,
  create_organization_enabled: true,
  created_at: 1748529384071,
  delete_self_enabled: true,
  email_addresses: [
    {
      created_at: 1748529376429,
      email_address: 'cauan.zela@gmail.com',
      id: 'idn_2xm3MwvXdL9Ih1rlrZ12Go3GFnu',
      linked_to: [Array],
      matches_sso_connection: false,
      object: 'email_address',
      reserved: false,
      updated_at: 1748529384086,
      verification: [Object]
    }
  ],
  enterprise_accounts: [],
  external_accounts: [
    {
      approved_scopes: 'email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile',
      avatar_url: 'https://lh3.googleusercontent.com/a/ACg8ocLW71aeJYfh88HSMA8nPo-W96DBGDP4UKP3ltC7r9odWJYBSoEW=s1000-c',
      created_at: 1748529376421,
      email_address: 'cauan.zela@gmail.com',
      external_account_id: 'eac_2xm3MqYigvXXhBLGTEfLTyDhVm5',
      family_name: '',
      first_name: 'Blue',
      given_name: 'Blue',
      google_id: '113383935084218025220',
      id: 'idn_2xm3MqsFMJCi1osfw5BwqBGtXHM',
      identification_id: 'idn_2xm3MqsFMJCi1osfw5BwqBGtXHM',
      image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMVzcxYWVKWWZoODhIU01BOG5Qby1XOTZEQkdEUDRVS1AzbHRDN3I5b2RXSllCU29FVz1zMTAwMC1jIiwicyI6ImNyS2RDbTJqOSs3TDcwN2EzZi8xc3ViejB1dTVXZU9xVGtidkNOc0MrYXcifQ',
      label: null,
      last_name: '',
      object: 'google_account',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLW71aeJYfh88HSMA8nPo-W96DBGDP4UKP3ltC7r9odWJYBSoEW=s1000-c',
      provider: 'oauth_google',
      provider_user_id: '113383935084218025220',
      public_metadata: {},
      updated_at: 1748529376421,
      username: null,
      verification: [Object]
    }
  ],
  external_id: null,
  first_name: 'Blue',
  has_image: true,
  id: 'user_2xm3Ns4xyzo04UqORAIqnvoVYIl',
  image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeG0zTnJCdW5hY3Q5b0dlWThST2VaSWRvQnYifQ',
  last_active_at: 1748529384070,
  last_name: null,
  last_sign_in_at: null,
  legal_accepted_at: null,
  locked: false,
  lockout_expires_in_seconds: null,
  mfa_disabled_at: null,
  mfa_enabled_at: null,
  object: 'user',
  passkeys: [],
  password_enabled: false,
  phone_numbers: [],
  primary_email_address_id: 'idn_2xm3MwvXdL9Ih1rlrZ12Go3GFnu',
  primary_phone_number_id: null,
  primary_web3_wallet_id: null,
  private_metadata: {},
  profile_image_url: 'https://images.clerk.dev/oauth_google/img_2xm3NrBunact9oGeY8ROeZIdoBv',
  public_metadata: {},
  saml_accounts: [],
  totp_enabled: false,
  two_factor_enabled: false,
  unsafe_metadata: {},
  updated_at: 1748529384104,
  username: 'kesob',
  verification_attempts_remaining: 100,
  web3_wallets: []
}
*/


//* OQUE O EVT CONTÉM NO EVENTO USER.CREATED:
/* 
{
  data: {
    abandon_at: 1751205677983,
    actor: null,
    client_id: 'client_2xjG2miQBMilOkCUgTVvSn3S3ti',
    created_at: 1748613677984,
    expire_at: 1749218477983,
    id: 'sess_2xooEoyS0GKEFzr0b4B0HNFj9LN',
    last_active_at: 1748613677983,
    object: 'session',
    status: 'active',
    updated_at: 1748613678036,
    user_id: 'user_2xooEnd38XuQPjBb8GVzlYbWTPQ'
  },
  event_attributes: {
    http_request: {
      client_ip: '45.229.97.17',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0'
    }
  },
  instance_id: 'ins_2xdTC7wYwrzse1boEahB5lyWR8N',
  object: 'event',
  timestamp: 1748613678044,
  type: 'session.created'
}
{
  abandon_at: 1751205677983,
  actor: null,
  client_id: 'client_2xjG2miQBMilOkCUgTVvSn3S3ti',
  created_at: 1748613677984,
  expire_at: 1749218477983,
  id: 'sess_2xooEoyS0GKEFzr0b4B0HNFj9LN',
  last_active_at: 1748613677983,
  object: 'session',
  status: 'active',
  updated_at: 1748613678036,
  user_id: 'user_2xooEnd38XuQPjBb8GVzlYbWTPQ'
}
{
  data: {
    backup_code_enabled: false,
    banned: false,
    create_organization_enabled: true,
    created_at: 1748613677963,
    delete_self_enabled: true,
    email_addresses: [ [Object] ],
    enterprise_accounts: [],
    external_accounts: [ [Object] ],
    external_id: null,
    first_name: 'Blue',
    has_image: true,
    id: 'user_2xooEnd38XuQPjBb8GVzlYbWTPQ',
    image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeG9vRWk4ZWtrZ09IdzNkdzhLWmpadjE2QTIifQ',
    last_active_at: 1748613677961,
    last_name: null,
    last_sign_in_at: null,
    legal_accepted_at: null,
    locked: false,
    lockout_expires_in_seconds: null,
    mfa_disabled_at: null,
    mfa_enabled_at: null,
    object: 'user',
    passkeys: [],
    password_enabled: false,
    phone_numbers: [],
    primary_email_address_id: 'idn_2xooDMTG9UOdp7UkpBsig3AxOjP',
    primary_phone_number_id: null,
    primary_web3_wallet_id: null,
    private_metadata: {},
    profile_image_url: 'https://images.clerk.dev/oauth_google/img_2xooEi8ekkgOHw3dw8KZjZv16A2',
    public_metadata: {},
    saml_accounts: [],
    totp_enabled: false,
    two_factor_enabled: false,
    unsafe_metadata: {},
    updated_at: 1748613677999,
    username: 'jezojiwy',
    verification_attempts_remaining: 100,
    web3_wallets: []
  },
  event_attributes: {
    http_request: {
      client_ip: '45.229.97.17',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0'
    }
  },
  instance_id: 'ins_2xdTC7wYwrzse1boEahB5lyWR8N',
  object: 'event',
  timestamp: 1748613678028,
  type: 'user.created'
}
{
  backup_code_enabled: false,
  banned: false,
  create_organization_enabled: true,
  created_at: 1748613677963,
  delete_self_enabled: true,
  email_addresses: [
    {
      created_at: 1748613666581,
      email_address: 'cauan.zela@gmail.com',
      id: 'idn_2xooDMTG9UOdp7UkpBsig3AxOjP',
      linked_to: [Array],
      matches_sso_connection: false,
      object: 'email_address',
      reserved: false,
      updated_at: 1748613677973,
      verification: [Object]
    }
  ],
  enterprise_accounts: [],
  external_accounts: [
    {
      approved_scopes: 'email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile',
      avatar_url: 'https://lh3.googleusercontent.com/a/ACg8ocLW71aeJYfh88HSMA8nPo-W96DBGDP4UKP3ltC7r9odWJYBSoEW=s1000-c',
      created_at: 1748613666574,
      email_address: 'cauan.zela@gmail.com',
      external_account_id: 'eac_2xooDOPJk2bzL4gHasxxIR3NxNw',
      family_name: '',
      first_name: 'Blue',
      given_name: 'Blue',
      google_id: '113383935084218025220',
      id: 'idn_2xooDR7NHWoYUE8mGSSY0fjROs3',
      identification_id: 'idn_2xooDR7NHWoYUE8mGSSY0fjROs3',
      image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMVzcxYWVKWWZoODhIU01BOG5Qby1XOTZEQkdEUDRVS1AzbHRDN3I5b2RXSllCU29FVz1zMTAwMC1jIiwicyI6ImNyS2RDbTJqOSs3TDcwN2EzZi8xc3ViejB1dTVXZU9xVGtidkNOc0MrYXcifQ',
      label: null,
      last_name: '',
      object: 'google_account',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLW71aeJYfh88HSMA8nPo-W96DBGDP4UKP3ltC7r9odWJYBSoEW=s1000-c',
      provider: 'oauth_google',
      provider_user_id: '113383935084218025220',
      public_metadata: {},
      updated_at: 1748613666574,
      username: null,
      verification: [Object]
    }
  ],
  external_id: null,
  first_name: 'Blue',
  has_image: true,
  id: 'user_2xooEnd38XuQPjBb8GVzlYbWTPQ',
  image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeG9vRWk4ZWtrZ09IdzNkdzhLWmpadjE2QTIifQ',
  last_active_at: 1748613677961,
  last_name: null,
  last_sign_in_at: null,
  legal_accepted_at: null,
  locked: false,
  lockout_expires_in_seconds: null,
  mfa_disabled_at: null,
  mfa_enabled_at: null,
  object: 'user',
  passkeys: [],
  password_enabled: false,
  phone_numbers: [],
  primary_email_address_id: 'idn_2xooDMTG9UOdp7UkpBsig3AxOjP',
  primary_phone_number_id: null,
  primary_web3_wallet_id: null,
  private_metadata: {},
  profile_image_url: 'https://images.clerk.dev/oauth_google/img_2xooEi8ekkgOHw3dw8KZjZv16A2',
  public_metadata: {},
  saml_accounts: [],
  totp_enabled: false,
  two_factor_enabled: false,
  unsafe_metadata: {},
  updated_at: 1748613677999,
  username: 'jezojiwy',
  verification_attempts_remaining: 100,
  web3_wallets: []
}
*/