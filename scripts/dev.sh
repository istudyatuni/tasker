#!/bin/sh
# deps: docker, docker-compose, tmux, elixir (iex), node (yarn)

session=tasker

docker_state=`systemctl --no-page show docker | grep ActiveState`
if [[ $docker_state == "ActiveState=inactive" ]]; then
	systemctl start docker
fi

tmux new -d -s $session -n db || {
	tmux attach-session -t $session && exit
}
tmux new-window -d -n server
tmux new-window -d -n web

tmux send-keys -t db 'docker-compose up db' Enter
echo 'sleep a little' && sleep 1
tmux send-keys -t server 'cd server && iex -S mix' Enter
tmux send-keys -t web 'cd web && yarn start' Enter

tmux attach-session -t $session
