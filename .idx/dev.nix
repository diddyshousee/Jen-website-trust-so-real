{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.python311
  ];
  idx = {
    previews = {
      enable = true;
      previews = {
        web = {
          command = [
            "python"
            "-m"
            "http.server"
            "$PORT"
          ];
          manager = "web";
        };
      };
    };
  };
}
