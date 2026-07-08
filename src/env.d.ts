/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** Utilisé quand une URL /en/* inconnue est réécrite vers /404/ */
    notFoundLang?: 'en';
  }
}
