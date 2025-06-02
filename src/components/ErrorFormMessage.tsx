export default function ErrorFormMessage({children}: {children: React.ReactNode}) {
    return (
      <p className=" bg-red-400 mt-2 p-2 text-sm text-white text-center rounded-lg">{children}</p>
    )
}