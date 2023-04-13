package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/compte", func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir(".")).ServeHTTP(w, r)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir(".")).ServeHTTP(w, r)
	})

	log.Println("Serveur démarré sur http://localhost:8080/pages/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
