FROM scratch

LABEL org.entando.bundle-name="%BUNDLENAME%"

ADD .entando/output/descriptors/ .
ADD microfrontends/jeff-mfe/build widgets/jeff-mfe
ADD microfrontends/another-mfe/build widgets/another-mfe
ADD microfrontends/another-mfe-config/build widgets/another-mfe-config
