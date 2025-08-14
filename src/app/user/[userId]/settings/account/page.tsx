"use client"

import DangerZone, { DangerZoneButton } from "@/components/global/danger-zone"
import { FormGenerator } from "@/components/global/form-generator"
import { TabsSection } from "@/components/global/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAccountSettings } from "@/hooks/contexts/settings"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import React from "react"

const AccountSettingsPage = () => {
  const { userId } = useParams()

  const {
    register,
    errors,
    avatarPreview,
    userData,
    updatingProfile,
    handleSubmitProfile,
    updatingPassword,
    handleSubmitPassword,
  } = useAccountSettings(userId as string)

  return (
    <>
      <TabsSection
        title="Account Settings"
        description="Manage your profile and security preferences."
      >
        <form className="space-y-10" onSubmit={e => e.preventDefault()}>
          <div className="flex flex-col items-center justify-center gap-4">
            <Avatar className="w-24 h-24 shadow-md bg-background">
              <AvatarImage key={avatarPreview} src={avatarPreview} alt="User Avatar" />
              <AvatarFallback>
                {userData?.firstName?.charAt(0).toUpperCase()}
                {userData?.lastName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Label htmlFor="upload-avatar">
              <Input
                {...register("avatar")}
                type="file"
                id="upload-avatar"
                className="hidden"
                accept="image/*"
              />
              <p className="font-bold text-primary hover:underline hover:cursor-pointer">
                Change Avatar
              </p>
            </Label>
          </div>

          <div className="flex flex-row gap-8 items-center justify-between">
            <div className="flex-1">
              <FormGenerator
                register={register}
                errors={errors}
                name="firstName"
                type="text"
                label="First Name"
                inputType="input"
                placeholder={userData?.firstName ?? "Your first name"}
                defaultValue={userData?.firstName}
              />
            </div>
            <div className="flex-1">
              <FormGenerator
                register={register}
                errors={errors}
                name="lastName"
                type="text"
                label="Last Name"
                inputType="input"
                placeholder={userData?.lastName ?? "Your last name"}
                defaultValue={userData?.lastName}
              />
            </div>
          </div>

          {/* EMAIL (read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Your Email" defaultValue={userData?.email} disabled />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={updatingProfile}
              onClick={handleSubmitProfile}
              className="hover:cursor-pointer"
            >
              {updatingProfile ? <Loader2 className="animate-spin" /> : "Update Profile"}
            </Button>
          </div>
        </form>
      </TabsSection>

      <TabsSection title="Security" description="Update your password securely.">
        <form className="space-y-10" onSubmit={e => e.preventDefault()}>
          <FormGenerator
            register={register}
            errors={errors}
            name="password"
            type="password"
            label="New Password"
            placeholder="Your new password"
            inputType="input"
          />
          <FormGenerator
            register={register}
            errors={errors}
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your new password"
            inputType="input"
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={updatingPassword}
              onClick={handleSubmitPassword}
              className="hover:cursor-pointer"
            >
              {updatingProfile ? <Loader2 className="animate-spin" /> : "Update Password"}
            </Button>
          </div>
        </form>
      </TabsSection>

      <DangerZone
        description="This action cannot be undone. It will permanently delete your account and all your data from our server."
        className="mt-6"
      >
        <DangerZoneButton>Delete Account</DangerZoneButton>
      </DangerZone>
    </>
  )
}

export default AccountSettingsPage
