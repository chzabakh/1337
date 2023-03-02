/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fillit.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/09 21:31:39 by chzabakh          #+#    #+#             */
/*   Updated: 2019/06/27 15:10:00 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FILLIT_H
# define FILLIT_H
# define BUFF_SIZE 32
# include "../libft/libft.h"
# include "get_next_line.h"
# include <fcntl.h>

typedef struct	s_var
{
	int		i;
	int		j;
	int		k;
}				t_var;

typedef struct	s_var1
{
	int		i;
	int		j;
}				t_var1;

typedef struct	s_var2
{
	int		i;
	int		j;
	int		c;
}				t_var2;

typedef struct	s_var3
{
	int		fd1;
	int		fd2;
	int		fd3;
	int		dimension;
	char	**board;
}				t_var3;

typedef struct	s_sto
{
	char			tet[4][4];
	int				x[4];
	int				y[4];
	int				imin;
	int				jmin;
	struct s_sto	*next;
}				t_sto;

typedef struct	s_var4
{
	t_sto	*head;
	char	*line;
	char	*fstmp;
	char	*fs;
	int		i;
}				t_var4;

typedef struct	s_tetriminos
{
	char	*file_sto;
	int		diez;
	int		point;
	int		newline;
	int		i;
	int		j;
}				t_tetriminos;

int				get_next_line(const int fd, char **line);
int				ft_file_storage(int fd);
int				ft_validate_tetriminos(char *fs);
char			**ft_board(int size);
int				ft_read2(int fd);
t_sto			*ft_read3(int fd);
int				ft_open(char *argument);
int				ft_chk_plc(t_sto *hd, char **brd, int dim, t_var1 ij);
void			ft_plc_tet(t_sto *hd, char **board, int i, int j);
void			ft_rmv_tet(t_sto *hd, char **board, int i, int j);
void			ft_bt(t_sto *head, int dim);
void			ft_boarddel(char **board);
void			ft_lstrmv(t_sto **head);
#endif
