# SolidStart + Supabase Starter Kit

A modern starter kit using **SolidStart**, **Supabase**, and **solid-ui**. This project is structured to help you get started quickly with a full-stack application using SolidJS and Supabase.

---

## 🚧 Features

- ✅ Authentication (in progress)
- 💳 Stripe integration (coming soon)
- 🖼️ Landing page (coming soon)
- 📦 Production deployment docs (coming soon)

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/solid-supabase-starter.git
cd solid-supabase-starter
````

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set up Supabase

* Create a new project at [supabase.io](https://supabase.io).
* Go to the project dashboard and obtain your project URL and anon/public API key.
* Copy the `.env.example` file to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

### 4. Add required Supabase SQL functions

In your Supabase SQL editor, run the following functions:

#### 🔒 `update_password` function

```sql
CREATE OR REPLACE FUNCTION update_password (
  "current_plain_password" TEXT,
  "new_plain_password" TEXT,
  "current_id" UUID
) RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE encpass auth.users.encrypted_password %TYPE;
BEGIN
SELECT encrypted_password
FROM auth.users INTO encpass
WHERE id = current_id
  AND encrypted_password = crypt(
    current_plain_password,
    auth.users.encrypted_password
  );

IF encpass IS NULL THEN RETURN 'incorrect';
ELSE
UPDATE auth.users
SET encrypted_password = crypt(new_plain_password, gen_salt('bf'))
WHERE id = current_id;
RETURN 'success';
END IF;
END;
$$;
```

#### ❌ `deleteUser` function

```sql
CREATE or replace function "deleteUser"()
  returns void
LANGUAGE SQL SECURITY DEFINER 
AS $$
   delete from auth.users where id = auth.uid();
$$;
```

> ⚠️ These functions require RLS (Row-Level Security) to be correctly configured for the `auth.users` table.

### 5. Run the development server

```bash
npm run dev
# or
pnpm dev
```

---

## 📦 Technologies Used

* [SolidStart](https://start.solidjs.com/)
* [Supabase](https://supabase.com/)
* [solid-ui](https://github.com/solidjs-community/solid-ui)
* [Stripe](https://stripe.com) *(coming soon)*

---

## 📘 License

MIT

---

## 💬 Feedback / Contributions

Feel free to open issues or pull requests to contribute or report problems. Your input is welcome!
