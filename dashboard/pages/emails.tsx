import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Box } from "../components/common/Box";
import { Input } from "../components/common/Input";
import { Text } from "../components/common/Text";
import { NavBar } from "../components/containers/Nav";
import styles from "../styles/Home.module.css";
import { theme } from "../styles/theme";

const ConfigureEmail = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: errors,
    control,
  } = useForm();

  useEffect(() => {
    if (errors.errors.senderAddress) {
      console.log(errors.errors.senderAddress.message);
      toast(errors.errors.senderAddress.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [errors]);

  const handleSendEmail = () => {
    console.log(control._formValues.senderAddress);
    axios.post("https://dinner-in-motion-project.ew.r.appspot.com/email/send", {
      email: "lepadatum@mail.ru",
    });
  };
  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Email configuration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box row>
        <NavBar />

        <form
          style={{ display: "contents" }}
          onSubmit={handleSubmit(handleSendEmail)}
        >
          <Box column css={{ padding: "4em" }}>
            <Box column>
              <label
                style={{
                  color: `${theme.colors.gray800}`,
                }}
              >
                Mail Header
              </label>
              <Input
                css={{ marginTop: "5px" }}
                {...register("mailHeader", {
                  required: false,
                })}
                placeholder="some header..."
              />
            </Box>

            <Box column>
              <label
                style={{
                  color: `${theme.colors.gray800}`,
                }}
              >
                Mail Intro
              </label>
              <Input
                css={{ marginTop: "5px" }}
                {...register("mailIntro", {
                  required: false,
                })}
                placeholder="some intro..."
              />
            </Box>

            <Box column>
              <label
                style={{
                  color: `${theme.colors.gray800}`,
                }}
              >
                Mail Body
              </label>
              <textarea
                placeholder="some body.."
                {...register("mailBody")}
                style={{
                  backgroundColor: `${theme.colors.gray400}`,
                  font: "inherit",
                  color: `${theme.colors.gray800}`,
                  fontSize: "16px",
                  height: "90px",
                  width: "100%",
                  border: `1px solid ${theme.colors.gray600}`,
                  paddingTop: "13px",
                  borderRadius: "6px",
                  margin: "5px 0 20px 0",
                }}
              ></textarea>
            </Box>

            <Box column>
              <label
                style={{
                  color: `${theme.colors.gray800}`,
                }}
              >
                Mail Footer
              </label>
              <Input
                css={{ marginTop: "5px" }}
                {...register("mailFooter", {
                  required: false,
                })}
                placeholder="Survey title"
              />
            </Box>

            <Box column>
              <label
                style={{
                  color: `${theme.colors.gray800}`,
                }}
              >
                Mail Image
              </label>
              <Input
                css={{ marginTop: "5px" }}
                {...register("mailImage", {
                  required: false,
                })}
                placeholder="some footer..."
              />
            </Box>
          </Box>
          <Box column css={{ padding: "4em" }}>
            <Box column>
              <label
                style={{
                  color: `${theme.colors.gray800}`,
                }}
              >
                Sender Address
              </label>
              <Input
                css={{
                  marginTop: "5px",
                  marginBottom: "15px",
                }}
                {...register("senderAddress", {
                  required: "Address can not be empty",
                })}
                placeholder="example@google.com"
              />
              {errors && errors.errors && errors.errors.senderAddress && (
                <Text
                  css={{ color: "red", margin: "10px 0", fontSize: "12px" }}
                >
                  {errors.errors.senderAddress.message}
                </Text>
              )}
            </Box>

            <input
              type="submit"
              value="Update"
              style={{
                width: "100%",
                height: "40px",
                background: `${theme.colors.voilet100}`,
                border: `1px solid ${theme.colors.voilet100}`,
                color: "white",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            ></input>
          </Box>
        </form>
      </Box>
    </div>
  );
};
export default ConfigureEmail;
