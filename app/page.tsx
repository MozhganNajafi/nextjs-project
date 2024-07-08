'use client';
import { UserForm } from '@/components/form/form';
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <UserForm />
    </main>
  );
}
