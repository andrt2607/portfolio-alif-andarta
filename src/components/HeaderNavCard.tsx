import CardNav from "./core/CardNav";
import logo from "../../public/assets/my_image.jpg";

const HeaderNavCard: React.FC = () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "About Me",
          href: "#about",
          ariaLabel: "About Me",
        },

        {
          label: "Education",
          href: "#education",
          ariaLabel: "Education",
        },
        {
          label: "Skills",
          href: "#skills",
          ariaLabel: "Skills",
        },
      ],
    },
    {
      label: "Experience",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Experience",
          href: "#experience",
          ariaLabel: "Experience",
        },
        {
          label: "Featured",
          href: "#portfolio",
          ariaLabel: "Featured Projects",
        },
        {
          label: "Activities",
          href: "#activities",
          ariaLabel: "Project Activities",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Contact",
          href: "#contact",
          ariaLabel: "Contact",
        },
        // {
        //   label: "Twitter",
        //   href: "https://twitter.com/company",
        //   ariaLabel: "Twitter",
        // },
        // {
        //   label: "LinkedIn",
        //   href: "https://linkedin.com/company/company",
        //   ariaLabel: "LinkedIn",
        // },
      ],
    },
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#000"
      menuColor="#fff"
      buttonBgColor="#fff"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};

export default HeaderNavCard;
