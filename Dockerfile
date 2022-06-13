FROM scratch

ADD .entando/output/descriptors/ .
ADD microfrontends/jeff-mfe/build widgets/jeff-mfe
ADD microfrontends/another-mfe/build widgets/another-mfe

