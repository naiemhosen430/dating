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
        <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
          Acceptance of Terms
        </h1>
        <h1 className="text-slate-500 text-lg p-4">
          By accessing or using the Zane chatting platform ("Zane"), you agree
          to comply with and be bound by the following Terms of Service. If you
          do not agree with these terms, please do not use Zane.
        </h1>

        <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
          Use of Zane
        </h1>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">Eligibility:</h1>
          <h1 className="text-slate-500 text-sm p-4">
            You must be at least 13 years old to use Zane. If you are under 13,
            please do not use the service.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            Account Creation:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            To use certain features of Zane, you must create an account. You
            agree to provide accurate and complete information during the
            registration process and to update such information to keep it
            accurate and current.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">User Conduct:</h1>
          <h1 className="text-slate-500 text-sm p-4">
            You are responsible for your use of Zane, including the content you
            create and share. You agree not to engage in any activity that may:
          </h1>
          <h1 className="text-slate-500 text-xs p-4">
            Violate any laws, regulations, or third-party rights.
          </h1>
          <h1 className="text-slate-500 text-xs p-4">
            Interfere with or disrupt Zane's operation.
          </h1>
          <h1 className="text-slate-500 text-xs p-4">
            Harass, threaten, or harm other users.
          </h1>
        </div>

        <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
          Content and Ownership
        </h1>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            User-Generated Content:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            By using Zane, you grant us a non-exclusive, transferable,
            sub-licensable, royalty-free license to use, modify, and distribute
            the content you create on Zane solely for the purpose of operating
            and improving Zane.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            Intellectual Property:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            Zane and its original content (excluding user-generated content) are
            the property of MD Naiem Hosen and are protected by intellectual
            property laws. You may not use Zane for any purpose not expressly
            permitted by these terms.
          </h1>
        </div>

        <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
          Privacy
        </h1>

        <div className="py-5">
          <h1 className="text-2xl text-white font-bold p-2">
            Data Collection:
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            Your use of Zane is subject to our Privacy Policy. By using Zane,
            you consent to the collection and use of your information as
            outlined in the Privacy Policy.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
            Termination
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            We reserve the right to terminate or suspend your account and access
            to Zane for any reason, without notice, at our discretion.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
            Changes to Terms
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            We may update these Terms of Service from time to time. Any changes
            will be posted on this page, and your continued use of Zane after
            such changes will constitute your acceptance of the updated terms.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
            Disclaimer of Warranties
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            Zane is provided "as is" without any warranties, expressed or
            implied. We do not guarantee that Zane will be uninterrupted,
            secure, or error-free.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
            Limitation of Liability
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            To the fullest extent permitted by law, MD Naiem Hosen shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues.
          </h1>
        </div>

        <div className="py-5">
          <h1 className="text-lg mt-10 text-center bg-slate-950 text-slate-500 font-bold p-2">
            Contact Us
          </h1>
          <h1 className="text-slate-500 text-sm p-4">
            If you have any questions or concerns about these Terms of Service,
            please contact us at naiemhosen430@gmail.com.
          </h1>
        </div>
      </div>
    </>
  );
}
