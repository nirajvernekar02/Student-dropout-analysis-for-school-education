import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import FooterLogoSVG from "../Images/Frame 49.svg";

function Footer() {
  const navigation = ["About", "Resources", "Contact", "Donate"];
  const legal = ["Terms", "Privacy", "Legal"];
  return (
    <div style={{ fontFamily: "Poppins" }} className="relative bg-[#000033]">
      <div>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {" "}
              <div className="flex items-center space-x-2 text-2xl font-medium text-white dark:text-gray-100">
                <img
                  src={FooterLogoSVG}
                  alt="N"
                  width={300}
                  // height="32"
                  // className="w-8"
                />
                {/* <FooterLogoSVG /> */}
                {/* <span>Project Artha</span> */}
              </div>
            </div>

            <div className="max-w-md mt-4 text-white dark:text-gray-400">
              Add the content here
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <div
                  key={index}
                  className="w-full px-4 py-2 text-white rounded-md "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <div
                  key={index}
                  className="w-full px-4 py-2 text-white rounded-md "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="text-white">
            <div>Follow us</div>
            <div className="flex mt-5 space-x-5 text-white ">
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener"
                className="hover:relative hover:top-[-3px] hover:transition-[top] hover:duration-300 hover:ease-in-out"
              >
                <TwitterIcon className="cursor-pointer" fontSize="large" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener"
                className="hover:relative hover:top-[-3px] hover:transition-[top] hover:duration-300 hover:ease-in-out"
              >
                <FacebookIcon className="cursor-pointer" fontSize="large" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener"
                className="hover:relative hover:top-[-3px] hover:transition-[top] hover:duration-300 hover:ease-in-out"
              >
                <InstagramIcon className="cursor-pointer" fontSize="large" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener"
                className="hover:relative hover:top-[-3px] hover:transition-[top] hover:duration-300 hover:ease-in-out"
              >
                <LinkedInIcon className="cursor-pointer" fontSize="large" />
              </a>
              {/* </a> */}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 text-sm text-center text-white dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by {""}
          <a href="https://web3templates.com/" target="_blank" rel="noopener">
            Team Matrix Glitch
          </a>{" "}
          Technologies{" "}
          <a href="https://www.glazestock.com/" target="_blank" rel="noopener ">
            Belgaum
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
