import Link from "next/link";
import React from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp } from "react-icons/md";

export default function page() {
  return (
    <>
      <div className="p-2 flex items-center text-3xl">
        <div className="w-6/12">
          <Link href={"/"}>
            <CgArrowLeft />
          </Link>
        </div>
        <div className="w-6/12 text-right">
          <MdHelp className="inline-block" />
        </div>
      </div>
      <div className="p-5 overflow-y-auto h-screen pb-10">
        <h1 className="text-slate-500 text-center bg-slate-900 p-4 text-sm">
          Last updated: 10 November 2023
        </h1>
        <h1 className="text-slate-500 text-lg p-4">
          Welcome to Zane, a free chatting platform developed by MD Naiem Hosen.
          We are committed to protecting your privacy and providing you with a
          secure and enjoyable experience while using our application. This
          Privacy Policy outlines the types of information we may collect, how
          we use and protect that information, and your rights regarding your
          personal data.
        </h1>

        <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
          Information We Collect
        </h1>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            Account Information:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            When you create an account on Zane, we collect your email, name, and
            password to facilitate account management and authentication.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            User-Generated Content:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            Any content, such as messages, photos, and videos, shared on Zane is
            stored on our servers to enable communication between users.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">Log Data:</h1>
          <h1 className="text-slate-500 text-sm p-4">
            We automatically collect information about your device and how you
            use Zane, including IP addresses, device type, browser type, and
            timestamps of actions.
          </h1>
        </div>

        <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
          How We Use Your Information
        </h1>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            Account Management:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            Your account information is used for authentication, account
            recovery, and to provide personalized features.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">Communication:</h1>
          <h1 className="text-slate-500 text-sm p-4">
            We use your data to facilitate communication between users and
            improve the user experience of Zane.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">Analytics:</h1>
          <h1 className="text-slate-500 text-sm p-4">
            We may use aggregated and anonymized data for analytical purposes to
            enhance and optimize Zane's performance.
          </h1>
        </div>

        <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
          Data Sharing and Security
        </h1>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            Third-Party Services:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            We do not sell, trade, or share your personal information with third
            parties for marketing purposes. However, we may use third-party
            services for analytics and infrastructure purposes.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">Security:</h1>
          <h1 className="text-slate-500 text-sm p-4">
            We implement industry-standard security measures to protect your
            information from unauthorized access, disclosure, alteration, and
            destruction.
          </h1>
        </div>

        <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
          Your Choices and Rights
        </h1>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            Account Settings:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            You can review and update your account information in the settings
            section of Zane.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            Communication Preferences:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            You can control the types of notifications you receive through your
            account settings.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">Data Deletion:</h1>
          <h1 className="text-slate-500 text-sm p-4">
            You have the right to request the deletion of your account and
            associated data. Contact us at [contact email] for assistance.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
            Changes to This Privacy Policy
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            We may update this Privacy Policy from time to time, and any changes
            will be reflected on this page. Please review this policy
            periodically for any updates.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
            Contact Us
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, please contact us at naiemhosen430@gmail.com.
          </h1>
        </div>
      </div>
    </>
  );
}
