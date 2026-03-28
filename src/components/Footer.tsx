'use client';

import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      className="bg-brand-secondary text-white"
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0 : 0.55, ease }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <motion.div
          className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: {
              transition: reduce
                ? { staggerChildren: 0 }
                : { staggerChildren: 0.08, delayChildren: 0.06 },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduce ? 0 : 0.45, ease },
              },
            }}
          >
            <h3 className="mb-4 text-lg font-semibold">Fair Fasteners</h3>
            <p className="text-sm leading-relaxed text-white/80">
              Premium fastening solutions for industrial and commercial applications.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduce ? 0 : 0.45, ease },
              },
            }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Products</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/80 transition hover:text-white">
                  Rivets
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 transition hover:text-white">
                  Bolts
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 transition hover:text-white">
                  Screws
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 transition hover:text-white">
                  Nuts & Washers
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduce ? 0 : 0.45, ease },
              },
            }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/80 transition hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 transition hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 transition hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 transition hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduce ? 0 : 0.45, ease },
              },
            }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Email: info@fairfasteners.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Industry St, City, State</li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-8 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Fair Fasteners. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-white/60 transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white/60 transition hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
