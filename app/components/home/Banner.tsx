export function Banner() {
  return (
    <div className="container py-10">
      <div className="dotted-background relative overflow-hidden rounded-3xl bg-teal-700 px-4 py-18">
        <div className="absolute bottom-full left-1/2 aspect-square w-10/12 -translate-x-1/2 translate-y-1/3 rounded-full bg-teal-700 shadow-[0px_0px_100px_20px_var(--color-teal-700)] shadow-teal-700"></div>
        <div className="relative z-10 mx-auto flex max-w-[500px] flex-col items-center gap-6 text-center">
          <div className="text-2xl leading-normal font-medium text-white md:text-5xl md:leading-15">
            Sağlamlıq yolçuluğun bir kliklə başlayır
          </div>
          <div className="font-medium text-teal-100">
            Sənin üçün uyğunlaşdırılmış peşəkar tibbi xidmətlərlə daha sağlam həyata addım at
          </div>
        </div>
      </div>
    </div>
  );
}
