/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fdf.h                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/19 21:11:41 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/20 00:10:07 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FDF_H
# define FDF_H
# include "../libft/libft.h"
# include <stdio.h>
# include <stdlib.h>
# include <math.h>
# include <mlx.h>

typedef	struct	s_fd
{
	int		fd1;
	int		fd2;
}				t_fd;

typedef	struct	s_var
{
	int		i;
	int		l;
}				t_var;

typedef	struct	s_var2
{
	int		i;
	int		j;
}				t_var2;
typedef	struct	s_bres
{
	int		dx;
	int		dy;
	int		stpx;
	int		stpy;
	int		am;
}				t_bres;
typedef struct	s_mlx
{
	int		**intable;
	int		**hextable;
	int		l;
	int		min;
	void	*mlx_ptr;
	void	*win_ptr;
	int		dim;
	int		dist;
	int		x0;
	int		y0;
	int		x;
	int		y;
	int		a;
	int		b;
	int		c;
	int		d;
	int		arwi;
	int		arwj;
}				t_mlx;

t_mlx			ft_open(char *argument, char **fs);
void			ft_image(t_mlx m);
void			ft_imageiso(t_mlx m);
void			ft_boarddel(char **board, char ***ctab2, int *ltab);
int				ft_hex(char *s);
void			ft_init(t_mlx *m);
int				close_window(void *m);
int				keypress(int keycode, void *m);
int				keypressiso(int keycode, void *m);
void			ft_line(t_mlx m, int x1, int y1, int color);
void			ft_draw(t_mlx *m);
void			ft_drawiso(t_mlx *m);
void			ft_lineiso(t_mlx m);
void			iso(int *x, int *y, int z);
void			ft_menu(void);
#endif
