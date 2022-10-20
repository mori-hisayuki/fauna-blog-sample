FROM ubuntu:20.04

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG WORK_DIR

# 証明書のDL
RUN set -x \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*
# Set TimeZone
RUN set -x \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        tzdata \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* \
    && ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && echo 'Asia/Tokyo' >/etc/timezone
# Install sudo
RUN set -x \
    && apt-get -y update \
    && apt-get install -y --no-install-recommends \
    sudo \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

# create group
RUN set -x \
    && groupadd --gid ${GROUP_ID} ${GROUP_NAME}

# create user
RUN set - x \
    && echo "$USER_NAME ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/${USER_NAME} \
    && chmod 0440 /etc/sudoers.d/${USER_NAME} \
    && useradd \
        --uid ${USER_ID} \
        --gid ${GROUP_ID} \
        --home-dir /home/${USER_NAME} \
        --create-home \
        --shell /bin/bash \
        ${USER_NAME}

# common tools install
# software-properties-common: add-apt-repository
RUN set -x \
    && apt-get -y update \
    && apt-get install -y --no-install-recommends \
    git \
    curl \
    openssh-client \
    jq \
    unzip \
    wget \
    software-properties-common \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

# vscode extensions cache (extensionsの再インストールを防ぐ)
# https://code.visualstudio.com/docs/remote/containers-advanced#_avoiding-extension-reinstalls-on-container-rebuild
RUN set -x \
    && mkdir -p /home/${USER_NAME}/.vscode-server/extensions \
    && chown -R vscode:vscode /home/${USER_NAME}/.vscode-server

# node18 install
RUN set -x \
    && apt-get -y update \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y --no-install-recommends \
    nodejs \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

# install awscliv2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install

# install yarn
RUN npm install -g yarn

# yarn add
# fauna shell https://github.com/fauna/fauna-shell
# serverless framework https://www.serverless.com/framework/docs/getting-started
RUN yarn global add \
    fauna-shell

USER ${USER_NAME}

# create workingirectory
RUN set -x \
    && mkdir /home/${USER_NAME}/${WORK_DIR}
WORKDIR /home/${USER_NAME}/${WORK_DIR}